import json
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
from backend.database import get_db_connection
from backend.auth import require_admin
from backend.schemas import CategoryCreate
from backend.notifications import create_notification

router = APIRouter(prefix="/api/admin", tags=["admin"])

class UserStatusUpdate(BaseModel):
    user_id: int
    status: str # 'verified', 'pending', 'suspended'

@router.get("/stats")
def get_admin_stats(current_user: dict = Depends(require_admin)):
    conn = get_db_connection()
    total_students = conn.execute("SELECT COUNT(*) as count FROM users WHERE role != 'admin'").fetchone()["count"]
    active_tasks = conn.execute("SELECT COUNT(*) as count FROM tasks WHERE status IN ('OPEN', 'APPLICATIONS', 'ASSIGNED', 'IN_PROGRESS', 'SUBMITTED', 'UNDER_REVIEW')").fetchone()["count"]
    completed_tasks = conn.execute("SELECT COUNT(*) as count FROM tasks WHERE status = 'COMPLETED'").fetchone()["count"]
    total_volume = conn.execute("SELECT COALESCE(SUM(amount), 0.0) as total FROM transactions WHERE type = 'escrow_release' AND status = 'completed'").fetchone()["total"]
    pending_reports = conn.execute("SELECT COUNT(*) as count FROM reports WHERE status = 'open'").fetchone()["count"]
    total_tasks = conn.execute("SELECT COUNT(*) as count FROM tasks").fetchone()["count"]

    # Category breakdown
    cat_stats = conn.execute("""
        SELECT category, COUNT(*) as count
        FROM tasks
        GROUP BY category
        ORDER BY count DESC
    """).fetchall()

    conn.close()

    return {
        "total_students": total_students,
        "active_tasks": active_tasks,
        "completed_tasks": completed_tasks,
        "total_tasks": total_tasks,
        "total_volume": round(total_volume, 2),
        "pending_reports": pending_reports,
        "category_distribution": [dict(c) for c in cat_stats]
    }

@router.get("/users")
def get_admin_users(current_user: dict = Depends(require_admin)):
    conn = get_db_connection()
    users = conn.execute("""
        SELECT id, anonymous_id, college_email, student_id, name, role,
               branch, year, skills, verification_status, rating, rating_count,
               wallet_balance, pending_balance, created_at,
               (SELECT COUNT(*) FROM tasks WHERE poster_id = users.id) as tasks_posted,
               (SELECT COUNT(*) FROM tasks WHERE assigned_junior_id = users.id AND status = 'COMPLETED') as tasks_completed
        FROM users
        ORDER BY id DESC
    """).fetchall()
    conn.close()

    results = []
    for u in users:
        item = dict(u)
        try:
            item["skills"] = json.loads(item["skills"]) if item["skills"] else []
        except Exception:
            item["skills"] = []
        results.append(item)

    return results

@router.patch("/users/status")
def update_user_status(data: UserStatusUpdate, current_user: dict = Depends(require_admin)):
    if data.status not in ["verified", "pending", "suspended"]:
        raise HTTPException(status_code=400, detail="Invalid status.")

    conn = get_db_connection()
    conn.execute("UPDATE users SET verification_status = ? WHERE id = ?", (data.status, data.user_id))
    conn.commit()

    create_notification(
        data.user_id,
        "Account Status Update",
        f"Your campus account status has been updated to: {data.status.upper()}.",
        "system"
    )

    conn.close()
    return {"success": True, "message": f"User status changed to {data.status}."}

@router.delete("/tasks/{task_id}")
def remove_task(task_id: int, current_user: dict = Depends(require_admin)):
    conn = get_db_connection()
    task = conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
    if not task:
        conn.close()
        raise HTTPException(status_code=404, detail="Task not found.")

    # If funds were locked in escrow, return to poster
    if task["status"] in ["OPEN", "APPLICATIONS", "ASSIGNED", "IN_PROGRESS"]:
        poster = conn.execute("SELECT wallet_balance, pending_balance FROM users WHERE id = ?", (task["poster_id"],)).fetchone()
        if poster:
            conn.execute("""
                UPDATE users SET wallet_balance = wallet_balance + ?, pending_balance = MAX(0.0, pending_balance - ?)
                WHERE id = ?
            """, (task["total_budget"], task["total_budget"], task["poster_id"]))

    conn.execute("UPDATE tasks SET status = 'CANCELLED' WHERE id = ?", (task_id,))
    conn.commit()

    create_notification(
        task["poster_id"],
        "Task Removed by Moderator",
        f"Your task '{task['title']}' was removed by campus administrators due to policy/academic guidelines.",
        "system"
    )

    conn.close()
    return {"success": True, "message": "Task removed and poster funds released."}

@router.post("/categories")
def add_category(data: CategoryCreate, current_user: dict = Depends(require_admin)):
    conn = get_db_connection()
    try:
        conn.execute("""
            INSERT INTO categories (name, icon, description, is_active)
            VALUES (?, ?, ?, 1)
        """, (data.name, data.icon, data.description))
        conn.commit()
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=400, detail=f"Category could not be created: {str(e)}")
    conn.close()
    return {"success": True, "message": f"Category '{data.name}' added."}
