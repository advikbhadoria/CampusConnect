from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends
from backend.database import get_db_connection
from backend.auth import get_current_user, mask_sensitive_data
from backend.schemas import MessageCreate
from backend.notifications import create_notification

router = APIRouter(prefix="/api/messages", tags=["messages"])

@router.get("/task/{task_id}")
def get_task_messages(task_id: int, current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    task = conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
    if not task:
        conn.close()
        raise HTTPException(status_code=404, detail="Task not found.")

    # Only poster, assigned junior, or admin can read messages
    if current_user["id"] not in [task["poster_id"], task["assigned_junior_id"]] and current_user["role"] != "admin":
        conn.close()
        raise HTTPException(status_code=403, detail="Not authorized to access this private conversation.")

    messages = conn.execute("""
        SELECT m.*, 
               s.anonymous_id as sender_anon_id,
               s.role as sender_role,
               r.anonymous_id as receiver_anon_id
        FROM messages m
        JOIN users s ON m.sender_id = s.id
        JOIN users r ON m.receiver_id = r.id
        WHERE m.task_id = ?
        ORDER BY m.id ASC
    """, (task_id,)).fetchall()

    # Mark incoming messages as read
    conn.execute("""
        UPDATE messages SET is_read = 1 WHERE task_id = ? AND receiver_id = ?
    """, (task_id, current_user["id"]))
    conn.commit()
    conn.close()

    return [dict(m) for m in messages]

@router.post("")
def send_message(data: MessageCreate, current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    task = conn.execute("SELECT * FROM tasks WHERE id = ?", (data.task_id,)).fetchone()
    if not task:
        conn.close()
        raise HTTPException(status_code=404, detail="Task not found.")

    if current_user["id"] not in [task["poster_id"], task["assigned_junior_id"]] and current_user["role"] != "admin":
        conn.close()
        raise HTTPException(status_code=403, detail="Not authorized to message in this task.")

    # Sanitize and mask sensitive student contact data
    sanitized_text = mask_sensitive_data(data.message.strip())
    now = datetime.now().isoformat()

    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO messages (task_id, sender_id, receiver_id, message, attachment, is_read, timestamp)
        VALUES (?, ?, ?, ?, ?, 0, ?)
    """, (data.task_id, current_user["id"], data.receiver_id, sanitized_text, data.attachment, now))
    msg_id = cursor.lastrowid

    # Notify recipient
    create_notification(
        data.receiver_id,
        f"New Message from {current_user['anonymous_id']}",
        f"{sanitized_text[:60]}...",
        "chat",
        data.task_id,
        db=conn
    )

    conn.commit()
    conn.close()
    return {
        "id": msg_id,
        "task_id": data.task_id,
        "sender_id": current_user["id"],
        "sender_anon_id": current_user["anonymous_id"],
        "message": sanitized_text,
        "attachment": data.attachment,
        "timestamp": now,
        "is_read": 0
    }

@router.get("/conversations")
def list_conversations(current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    tasks = conn.execute("""
        SELECT t.id as task_id, t.title as task_title, t.subject as task_subject, t.status as task_status,
               t.total_budget,
               p.id as poster_id, p.anonymous_id as poster_anon_id,
               j.id as junior_id, j.anonymous_id as junior_anon_id,
               (SELECT message FROM messages WHERE task_id = t.id ORDER BY id DESC LIMIT 1) as last_message,
               (SELECT timestamp FROM messages WHERE task_id = t.id ORDER BY id DESC LIMIT 1) as last_message_time,
               (SELECT COUNT(*) FROM messages WHERE task_id = t.id AND receiver_id = ? AND is_read = 0) as unread_count
        FROM tasks t
        JOIN users p ON t.poster_id = p.id
        LEFT JOIN users j ON t.assigned_junior_id = j.id
        WHERE (t.poster_id = ? OR t.assigned_junior_id = ?)
          AND t.status IN ('ASSIGNED', 'IN_PROGRESS', 'SUBMITTED', 'UNDER_REVIEW', 'COMPLETED', 'DISPUTED')
        ORDER BY last_message_time DESC NULLS LAST, t.id DESC
    """, (current_user["id"], current_user["id"], current_user["id"])).fetchall()
    conn.close()

    results = []
    for row in tasks:
        item = dict(row)
        if current_user["id"] == item["poster_id"]:
            item["other_anon_id"] = item["junior_anon_id"] or "Unassigned"
            item["other_user_id"] = item["junior_id"]
            item["other_role"] = "junior"
        else:
            item["other_anon_id"] = item["poster_anon_id"]
            item["other_user_id"] = item["poster_id"]
            item["other_role"] = "senior"
        results.append(item)

    return results
