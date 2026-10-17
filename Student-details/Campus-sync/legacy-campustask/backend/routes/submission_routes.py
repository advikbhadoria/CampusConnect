from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends
from backend.database import get_db_connection
from backend.auth import get_current_user, require_junior, require_senior
from backend.schemas import TaskSubmission
from backend.notifications import create_notification

router = APIRouter(prefix="/api/submissions", tags=["submissions"])

@router.post("/submit")
def submit_task_work(data: TaskSubmission, current_user: dict = Depends(require_junior)):
    conn = get_db_connection()
    task = conn.execute("SELECT * FROM tasks WHERE id = ?", (data.task_id,)).fetchone()
    if not task:
        conn.close()
        raise HTTPException(status_code=404, detail="Task not found.")

    if task["assigned_junior_id"] != current_user["id"]:
        conn.close()
        raise HTTPException(status_code=403, detail="You are not assigned to this task.")

    if task["status"] in ["COMPLETED", "CANCELLED"]:
        conn.close()
        raise HTTPException(status_code=400, detail=f"Task is already {task['status']}.")

    now = datetime.now().isoformat()
    conn.execute("""
        UPDATE tasks 
        SET status = 'SUBMITTED',
            submission_file = ?,
            submission_note = ?,
            submitted_at = ?
        WHERE id = ?
    """, (data.submission_file, data.submission_note, now, data.task_id))

    # Send system message in chat
    conn.execute("""
        INSERT INTO messages (task_id, sender_id, receiver_id, message, attachment, timestamp)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        data.task_id, current_user["id"], task["poster_id"],
        f"📁 Work submitted: '{data.submission_note}'",
        data.submission_file, now
    ))

    # Notify senior
    create_notification(
        task["poster_id"],
        "Work Submitted for Review",
        f"{current_user['anonymous_id']} submitted completed work for '{task['title']}'. Please review and approve.",
        "submission",
        task["id"],
        db=conn
    )

    conn.commit()
    conn.close()

    return {
        "success": True,
        "status": "SUBMITTED",
        "message": "Completed work submitted to senior for review."
    }

@router.post("/approve/{task_id}")
def approve_task_completion(task_id: int, current_user: dict = Depends(require_senior)):
    conn = get_db_connection()
    task = conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
    if not task:
        conn.close()
        raise HTTPException(status_code=404, detail="Task not found.")

    if task["poster_id"] != current_user["id"] and current_user["role"] != "admin":
        conn.close()
        raise HTTPException(status_code=403, detail="Only the task poster can approve completion.")

    if task["status"] not in ["SUBMITTED", "UNDER_REVIEW", "ASSIGNED", "IN_PROGRESS"]:
        conn.close()
        raise HTTPException(status_code=400, detail=f"Cannot approve task with status {task['status']}.")

    junior_id = task["assigned_junior_id"]
    if not junior_id:
        conn.close()
        raise HTTPException(status_code=400, detail="No junior assigned to this task.")

    now = datetime.now().isoformat()
    payout_amount = task["total_budget"]

    # 1. Update task status
    conn.execute("""
        UPDATE tasks 
        SET status = 'COMPLETED', completed_at = ?
        WHERE id = ?
    """, (now, task_id))

    # 2. Release escrow from Senior's pending balance
    poster = conn.execute("SELECT pending_balance FROM users WHERE id = ?", (task["poster_id"],)).fetchone()
    if poster:
        new_senior_pending = max(0.0, poster["pending_balance"] - payout_amount)
        conn.execute("UPDATE users SET pending_balance = ? WHERE id = ?", (new_senior_pending, task["poster_id"]))

    # 3. Add payout to Junior's available wallet balance
    junior = conn.execute("SELECT wallet_balance FROM users WHERE id = ?", (junior_id,)).fetchone()
    if junior:
        new_junior_wallet = junior["wallet_balance"] + payout_amount
        conn.execute("UPDATE users SET wallet_balance = ? WHERE id = ?", (new_junior_wallet, junior_id))

    # 4. Record transaction ledger
    conn.execute("""
        INSERT INTO transactions (task_id, payer_id, receiver_id, amount, type, description, status, timestamp)
        VALUES (?, ?, ?, ?, 'escrow_release', ?, 'completed', ?)
    """, (
        task_id, task["poster_id"], junior_id, payout_amount,
        f"Payment release for completed task '{task['title']}'",
        now
    ))

    # 5. System chat message
    conn.execute("""
        INSERT INTO messages (task_id, sender_id, receiver_id, message, timestamp)
        VALUES (?, ?, ?, ?, ?)
    """, (
        task_id, current_user["id"], junior_id,
        f"✅ Task approved and ₹{payout_amount:.0f} payment released to your wallet! Thank you for the great work.",
        now
    ))

    # 6. Notify Junior
    create_notification(
        junior_id,
        "Payment Received! 💰",
        f"₹{payout_amount:.0f} has been added to your wallet balance for '{task['title']}'.",
        "payment",
        task_id,
        db=conn
    )

    conn.commit()
    conn.close()

    return {
        "success": True,
        "status": "COMPLETED",
        "amount_released": payout_amount,
        "message": f"Task approved. ₹{payout_amount:.0f} released to junior's wallet."
    }

@router.post("/request-revision/{task_id}")
def request_revision(task_id: int, current_user: dict = Depends(require_senior)):
    conn = get_db_connection()
    task = conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
    if not task:
        conn.close()
        raise HTTPException(status_code=404, detail="Task not found.")

    if task["poster_id"] != current_user["id"] and current_user["role"] != "admin":
        conn.close()
        raise HTTPException(status_code=403, detail="Not authorized.")

    conn.execute("UPDATE tasks SET status = 'IN_PROGRESS' WHERE id = ?", (task_id,))
    now = datetime.now().isoformat()

    if task["assigned_junior_id"]:
        create_notification(
            task["assigned_junior_id"],
            "Revision Requested",
            f"Senior requested adjustments on '{task['title']}'. Check chat for details.",
            "submission",
            task_id,
            db=conn
        )

    conn.commit()
    conn.close()
    return {"success": True, "message": "Revision requested. Status updated to In Progress."}
