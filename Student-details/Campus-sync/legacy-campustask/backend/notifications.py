from datetime import datetime
from backend.database import get_db_connection

def create_notification(user_id: int, title: str, message: str, notif_type: str = "system", link_task_id: int = None, db = None):
    should_close = False
    if db is None:
        conn = get_db_connection()
        should_close = True
    else:
        conn = db

    now = datetime.now().isoformat()
    conn.execute("""
        INSERT INTO notifications (user_id, title, message, type, link_task_id, read, timestamp)
        VALUES (?, ?, ?, ?, ?, 0, ?)
    """, (user_id, title, message, notif_type, link_task_id, now))

    if should_close:
        conn.commit()
        conn.close()
