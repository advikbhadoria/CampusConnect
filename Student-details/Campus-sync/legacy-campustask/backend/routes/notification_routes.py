from fastapi import APIRouter, HTTPException, Depends
from backend.database import get_db_connection
from backend.auth import get_current_user

router = APIRouter(prefix="/api/notifications", tags=["notifications"])

@router.get("")
def get_notifications(current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    notifs = conn.execute("""
        SELECT * FROM notifications
        WHERE user_id = ?
        ORDER BY id DESC
        LIMIT 40
    """, (current_user["id"],)).fetchall()

    unread_count = conn.execute("""
        SELECT COUNT(*) as count FROM notifications
        WHERE user_id = ? AND read = 0
    """, (current_user["id"],)).fetchone()["count"]

    conn.close()

    return {
        "notifications": [dict(n) for n in notifs],
        "unread_count": unread_count
    }

@router.post("/{notif_id}/read")
def mark_read(notif_id: int, current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    conn.execute("""
        UPDATE notifications SET read = 1 WHERE id = ? AND user_id = ?
    """, (notif_id, current_user["id"]))
    conn.commit()
    conn.close()
    return {"success": True}

@router.post("/read-all")
def mark_all_read(current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    conn.execute("""
        UPDATE notifications SET read = 1 WHERE user_id = ?
    """, (current_user["id"],))
    conn.commit()
    conn.close()
    return {"success": True}
