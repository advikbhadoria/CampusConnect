from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends
from backend.database import get_db_connection
from backend.auth import get_current_user, require_junior, require_senior
from backend.schemas import ApplicationCreate, ApplicationDecision
from backend.notifications import create_notification

router = APIRouter(prefix="/api/applications", tags=["applications"])

@router.post("")
def apply_for_task(data: ApplicationCreate, current_user: dict = Depends(require_junior)):
    conn = get_db_connection()
    task = conn.execute("SELECT * FROM tasks WHERE id = ?", (data.task_id,)).fetchone()
    
    if not task:
        conn.close()
        raise HTTPException(status_code=404, detail="Task not found.")

    if task["status"] not in ["OPEN", "APPLICATIONS"]:
        conn.close()
        raise HTTPException(status_code=400, detail="This task is no longer accepting applications.")

    if task["poster_id"] == current_user["id"]:
        conn.close()
        raise HTTPException(status_code=400, detail="You cannot apply for your own task.")

    # Check if already applied
    existing = conn.execute("""
        SELECT id FROM applications WHERE task_id = ? AND applicant_id = ?
    """, (data.task_id, current_user["id"])).fetchone()
    if existing:
        conn.close()
        raise HTTPException(status_code=400, detail="You have already applied for this task.")

    now = datetime.now().isoformat()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO applications (task_id, applicant_id, proposed_price, estimated_time, message, status, created_at)
        VALUES (?, ?, ?, ?, ?, 'pending', ?)
    """, (data.task_id, current_user["id"], data.proposed_price, data.estimated_time, data.message, now))
    app_id = cursor.lastrowid

    # Update task status to APPLICATIONS if it was OPEN
    if task["status"] == "OPEN":
        conn.execute("UPDATE tasks SET status = 'APPLICATIONS' WHERE id = ?", (data.task_id,))

    # Notify senior
    create_notification(
        task["poster_id"],
        "New Application Received",
        f"{current_user['anonymous_id']} applied for '{task['title']}' at ₹{data.proposed_price:.0f}.",
        "application",
        task["id"],
        db=conn
    )

    conn.commit()
    conn.close()

    return {
        "success": True,
        "application_id": app_id,
        "message": "Application submitted successfully."
    }

@router.get("/task/{task_id}")
def get_task_applications(task_id: int, current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    task = conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
    if not task:
        conn.close()
        raise HTTPException(status_code=404, detail="Task not found.")

    if task["poster_id"] != current_user["id"] and current_user["role"] != "admin":
        conn.close()
        raise HTTPException(status_code=403, detail="Only the task poster or admin can view applications.")

    apps = conn.execute("""
        SELECT a.*, 
               u.anonymous_id as applicant_anon_id,
               u.rating as applicant_rating,
               u.rating_count as applicant_rating_count,
               u.branch as applicant_branch,
               u.year as applicant_year,
               u.skills as applicant_skills
        FROM applications a
        JOIN users u ON a.applicant_id = u.id
        WHERE a.task_id = ?
        ORDER BY a.created_at DESC
    """, (task_id,)).fetchall()
    conn.close()

    return [dict(a) for a in apps]

@router.post("/decision")
def decide_application(data: ApplicationDecision, current_user: dict = Depends(require_senior)):
    conn = get_db_connection()
    app = conn.execute("""
        SELECT a.*, t.poster_id, t.title as task_title, t.total_budget, u.anonymous_id as applicant_anon_id
        FROM applications a
        JOIN tasks t ON a.task_id = t.id
        JOIN users u ON a.applicant_id = u.id
        WHERE a.id = ?
    """, (data.application_id,)).fetchone()

    if not app:
        conn.close()
        raise HTTPException(status_code=404, detail="Application not found.")

    if app["poster_id"] != current_user["id"] and current_user["role"] != "admin":
        conn.close()
        raise HTTPException(status_code=403, detail="Not authorized to manage this application.")

    now = datetime.now().isoformat()
    if data.decision == "accepted":
        # Accept this application
        conn.execute("UPDATE applications SET status = 'accepted' WHERE id = ?", (data.application_id,))
        
        # Reject other pending applications for this task
        conn.execute("UPDATE applications SET status = 'rejected' WHERE task_id = ? AND id != ?", (app["task_id"], data.application_id))
        
        # Assign junior and set task to ASSIGNED / IN_PROGRESS
        conn.execute("""
            UPDATE tasks SET assigned_junior_id = ?, status = 'ASSIGNED' WHERE id = ?
        """, (app["applicant_id"], app["task_id"]))

        # Seed initial system greeting in chat
        conn.execute("""
            INSERT INTO messages (task_id, sender_id, receiver_id, message, timestamp)
            VALUES (?, ?, ?, ?, ?)
        """, (
            app["task_id"], current_user["id"], app["applicant_id"],
            f"Hi {app['applicant_anon_id']}! I have accepted your application for '{app['task_title']}'. Let me know if you have any questions about the instructions.",
            now
        ))

        # Notify Junior
        create_notification(
            app["applicant_id"],
            "Application Accepted! 🎉",
            f"{current_user['anonymous_id']} accepted your application for '{app['task_title']}'. You can now start and chat privately.",
            "acceptance",
            app["task_id"],
            db=conn
        )

        message = f"Accepted {app['applicant_anon_id']} for this task."
    else:
        conn.execute("UPDATE applications SET status = 'rejected' WHERE id = ?", (data.application_id,))
        message = "Application rejected."

    conn.commit()
    conn.close()
    return {"success": True, "message": message}

@router.get("/my-applications")
def get_my_applications(current_user: dict = Depends(require_junior)):
    conn = get_db_connection()
    apps = conn.execute("""
        SELECT a.*, 
               t.title as task_title,
               t.subject as task_subject,
               t.category as task_category,
               t.total_budget as task_budget,
               t.deadline as task_deadline,
               t.status as task_status,
               u.anonymous_id as poster_anon_id
        FROM applications a
        JOIN tasks t ON a.task_id = t.id
        JOIN users u ON t.poster_id = u.id
        WHERE a.applicant_id = ?
        ORDER BY a.created_at DESC
    """, (current_user["id"],)).fetchall()
    conn.close()

    return [dict(a) for a in apps]
