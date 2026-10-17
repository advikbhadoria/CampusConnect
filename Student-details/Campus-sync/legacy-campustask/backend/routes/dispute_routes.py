from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends
from backend.database import get_db_connection
from backend.auth import get_current_user, require_admin
from backend.schemas import DisputeCreate, DisputeResolve
from backend.notifications import create_notification

router = APIRouter(prefix="/api/disputes", tags=["disputes"])

@router.post("")
def raise_dispute(data: DisputeCreate, current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    task = conn.execute("SELECT * FROM tasks WHERE id = ?", (data.task_id,)).fetchone()
    if not task:
        conn.close()
        raise HTTPException(status_code=404, detail="Task not found.")

    if current_user["id"] not in [task["poster_id"], task["assigned_junior_id"]] and current_user["role"] != "admin":
        conn.close()
        raise HTTPException(status_code=403, detail="Not authorized to dispute this task.")

    reported_user_id = task["assigned_junior_id"] if current_user["id"] == task["poster_id"] else task["poster_id"]
    now = datetime.now().isoformat()

    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO reports (reporter_id, reported_user_id, task_id, reason, description, evidence_file, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, 'open', ?)
    """, (current_user["id"], reported_user_id, data.task_id, data.reason, data.description, data.evidence_file, now))
    dispute_id = cursor.lastrowid

    # Update task status to DISPUTED
    conn.execute("UPDATE tasks SET status = 'DISPUTED' WHERE id = ?", (data.task_id,))

    # Notify administrators
    admins = conn.execute("SELECT id FROM users WHERE role = 'admin'").fetchall()
    for adm in admins:
        create_notification(
            adm["id"],
            "⚠️ New Campus Dispute Filed",
            f"Dispute #{dispute_id} filed for task '{task['title']}' by {current_user['anonymous_id']}.",
            "system",
            data.task_id
        )

    conn.commit()
    conn.close()

    return {
        "success": True,
        "dispute_id": dispute_id,
        "message": "Dispute filed. Campus administration is reviewing the case."
    }

@router.get("")
def list_disputes(current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    if current_user["role"] == "admin":
        reports = conn.execute("""
            SELECT r.*, 
                   rep.anonymous_id as reporter_anon_id,
                   rep.name as reporter_real_name,
                   rep.student_id as reporter_student_id,
                   tgt.anonymous_id as reported_anon_id,
                   tgt.name as reported_real_name,
                   t.title as task_title,
                   t.total_budget as task_budget
            FROM reports r
            JOIN users rep ON r.reporter_id = rep.id
            LEFT JOIN users tgt ON r.reported_user_id = tgt.id
            LEFT JOIN tasks t ON r.task_id = t.id
            ORDER BY r.id DESC
        """).fetchall()
    else:
        reports = conn.execute("""
            SELECT r.*, 
                   rep.anonymous_id as reporter_anon_id,
                   tgt.anonymous_id as reported_anon_id,
                   t.title as task_title
            FROM reports r
            JOIN users rep ON r.reporter_id = rep.id
            LEFT JOIN users tgt ON r.reported_user_id = tgt.id
            LEFT JOIN tasks t ON r.task_id = t.id
            WHERE r.reporter_id = ? OR r.reported_user_id = ?
            ORDER BY r.id DESC
        """, (current_user["id"], current_user["id"])).fetchall()

    conn.close()
    return [dict(r) for r in reports]

@router.post("/resolve")
def resolve_dispute(data: DisputeResolve, current_user: dict = Depends(require_admin)):
    conn = get_db_connection()
    dispute = conn.execute("""
        SELECT r.*, t.poster_id, t.assigned_junior_id, t.total_budget, t.title as task_title
        FROM reports r
        LEFT JOIN tasks t ON r.task_id = t.id
        WHERE r.id = ?
    """, (data.dispute_id,)).fetchone()

    if not dispute:
        conn.close()
        raise HTTPException(status_code=404, detail="Dispute not found.")

    task_id = dispute["task_id"]
    now = datetime.now().isoformat()

    if data.action == "refund_senior" and task_id:
        poster_id = dispute["poster_id"]
        amount = dispute["total_budget"]
        # Refund to senior's wallet
        senior = conn.execute("SELECT wallet_balance, pending_balance FROM users WHERE id = ?", (poster_id,)).fetchone()
        if senior:
            conn.execute("""
                UPDATE users SET wallet_balance = wallet_balance + ?, pending_balance = MAX(0.0, pending_balance - ?)
                WHERE id = ?
            """, (amount, amount, poster_id))
            conn.execute("""
                INSERT INTO transactions (task_id, receiver_id, amount, type, description, status, timestamp)
                VALUES (?, ?, ?, 'refund', ?, 'completed', ?)
            """, (task_id, poster_id, amount, f"Dispute resolution refund for task '{dispute['task_title']}'", now))

        conn.execute("UPDATE tasks SET status = 'CANCELLED' WHERE id = ?", (task_id,))
        create_notification(poster_id, "Dispute Resolved: Refund Processed", f"₹{amount:.0f} refunded for '{dispute['task_title']}'.", "system", task_id)

    elif data.action == "release_junior" and task_id:
        junior_id = dispute["assigned_junior_id"]
        poster_id = dispute["poster_id"]
        amount = dispute["total_budget"]
        if junior_id and poster_id:
            # Release escrow from senior's pending to junior's wallet
            conn.execute("UPDATE users SET pending_balance = MAX(0.0, pending_balance - ?) WHERE id = ?", (amount, poster_id))
            conn.execute("UPDATE users SET wallet_balance = wallet_balance + ? WHERE id = ?", (amount, junior_id))
            conn.execute("""
                INSERT INTO transactions (task_id, payer_id, receiver_id, amount, type, description, status, timestamp)
                VALUES (?, ?, ?, ?, 'escrow_release', ?, 'completed', ?)
            """, (task_id, poster_id, junior_id, amount, f"Dispute resolution payment release for '{dispute['task_title']}'", now))
            create_notification(junior_id, "Dispute Resolved: Payment Released", f"₹{amount:.0f} released for '{dispute['task_title']}'.", "payment", task_id)

        conn.execute("UPDATE tasks SET status = 'COMPLETED', completed_at = ? WHERE id = ?", (now, task_id))

    conn.execute("""
        UPDATE reports SET status = 'resolved', admin_notes = ? WHERE id = ?
    """, (data.admin_notes, data.dispute_id))

    conn.commit()
    conn.close()

    return {"success": True, "message": f"Dispute resolved with action: {data.action}."}
