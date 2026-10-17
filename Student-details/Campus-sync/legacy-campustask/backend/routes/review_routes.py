from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends
from backend.database import get_db_connection
from backend.auth import get_current_user
from backend.schemas import ReviewCreate
from backend.notifications import create_notification

router = APIRouter(prefix="/api/reviews", tags=["reviews"])

@router.post("")
def create_review(data: ReviewCreate, current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    task = conn.execute("SELECT * FROM tasks WHERE id = ?", (data.task_id,)).fetchone()
    if not task:
        conn.close()
        raise HTTPException(status_code=404, detail="Task not found.")

    if task["status"] != "COMPLETED":
        conn.close()
        raise HTTPException(status_code=400, detail="Reviews can only be submitted for completed tasks.")

    # Determine who is being reviewed
    if current_user["id"] == task["poster_id"]:
        reviewed_user_id = task["assigned_junior_id"]
    elif current_user["id"] == task["assigned_junior_id"]:
        reviewed_user_id = task["poster_id"]
    else:
        conn.close()
        raise HTTPException(status_code=403, detail="You were not a participant in this task.")

    if not reviewed_user_id:
        conn.close()
        raise HTTPException(status_code=400, detail="Cannot review an unassigned user.")

    # Check if already reviewed
    existing = conn.execute("""
        SELECT id FROM reviews WHERE task_id = ? AND reviewer_id = ?
    """, (data.task_id, current_user["id"])).fetchone()
    if existing:
        conn.close()
        raise HTTPException(status_code=400, detail="You have already reviewed this task.")

    now = datetime.now().isoformat()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO reviews (task_id, reviewer_id, reviewed_user_id, rating, comment, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (data.task_id, current_user["id"], reviewed_user_id, data.rating, data.comment or "", now))
    review_id = cursor.lastrowid

    # Update recipient's average rating and count
    stats = conn.execute("""
        SELECT AVG(rating) as avg_rating, COUNT(id) as count
        FROM reviews
        WHERE reviewed_user_id = ?
    """, (reviewed_user_id,)).fetchone()

    new_avg = round(float(stats["avg_rating"]), 2) if stats["avg_rating"] else float(data.rating)
    new_count = stats["count"]

    conn.execute("""
        UPDATE users SET rating = ?, rating_count = ? WHERE id = ?
    """, (new_avg, new_count, reviewed_user_id))

    create_notification(
        reviewed_user_id,
        "New Rating Received ⭐",
        f"{current_user['anonymous_id']} rated you {data.rating} stars for '{task['title']}'.",
        "system",
        task["id"],
        db=conn
    )

    conn.commit()
    conn.close()

    return {
        "success": True,
        "review_id": review_id,
        "new_avg_rating": new_avg,
        "rating_count": new_count,
        "message": "Review submitted successfully."
    }

@router.get("/user/{user_id}")
def get_user_reviews(user_id: int):
    conn = get_db_connection()
    reviews = conn.execute("""
        SELECT r.*, 
               u.anonymous_id as reviewer_anon_id,
               u.role as reviewer_role,
               t.title as task_title,
               t.subject as task_subject
        FROM reviews r
        JOIN users u ON r.reviewer_id = u.id
        JOIN tasks t ON r.task_id = t.id
        WHERE r.reviewed_user_id = ?
        ORDER BY r.id DESC
    """, (user_id,)).fetchall()
    conn.close()

    return [dict(r) for r in reviews]
