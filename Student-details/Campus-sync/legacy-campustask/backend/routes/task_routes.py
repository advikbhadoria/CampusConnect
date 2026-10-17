from datetime import datetime
import json
from typing import Optional
from fastapi import APIRouter, HTTPException, Depends, Query
from backend.database import get_db_connection
from backend.auth import get_current_user, get_current_user_optional, require_senior
from backend.schemas import TaskCreate
from backend.notifications import create_notification

router = APIRouter(prefix="/api/tasks", tags=["tasks"])

@router.get("")
def list_tasks(
    search: Optional[str] = None,
    category: Optional[str] = None,
    subject: Optional[str] = None,
    min_budget: Optional[float] = None,
    max_budget: Optional[float] = None,
    difficulty: Optional[str] = None,
    status: Optional[str] = None,
    poster_id: Optional[int] = None,
    assigned_junior_id: Optional[int] = None,
    sort_by: Optional[str] = "newest", # newest, highest_budget, lowest_pages, nearest_deadline
    current_user: Optional[dict] = Depends(get_current_user_optional)
):
    conn = get_db_connection()
    query = """
        SELECT t.*, 
               u.anonymous_id as poster_anon_id, 
               u.rating as poster_rating,
               u.rating_count as poster_rating_count,
               j.anonymous_id as junior_anon_id,
               (SELECT COUNT(*) FROM applications WHERE task_id = t.id) as applications_count
        FROM tasks t
        JOIN users u ON t.poster_id = u.id
        LEFT JOIN users j ON t.assigned_junior_id = j.id
        WHERE 1=1
    """
    params = []

    if status:
        query += " AND t.status = ?"
        params.append(status)
    elif not poster_id and not assigned_junior_id:
        # Default marketplace view only shows open tasks or tasks receiving applications
        query += " AND t.status IN ('OPEN', 'APPLICATIONS')"

    if poster_id:
        query += " AND t.poster_id = ?"
        params.append(poster_id)

    if assigned_junior_id:
        query += " AND t.assigned_junior_id = ?"
        params.append(assigned_junior_id)

    if category and category.lower() != "all":
        query += " AND t.category = ?"
        params.append(category)

    if subject and subject.lower() != "all":
        query += " AND LOWER(t.subject) LIKE ?"
        params.append(f"%{subject.lower()}%")

    if difficulty and difficulty.lower() != "all":
        query += " AND t.difficulty = ?"
        params.append(difficulty)

    if min_budget is not None:
        query += " AND t.total_budget >= ?"
        params.append(min_budget)

    if max_budget is not None:
        query += " AND t.total_budget <= ?"
        params.append(max_budget)

    if search:
        search_like = f"%{search.strip().lower()}%"
        query += " AND (LOWER(t.title) LIKE ? OR LOWER(t.subject) LIKE ? OR LOWER(t.description) LIKE ? OR LOWER(t.category) LIKE ?)"
        params.extend([search_like, search_like, search_like, search_like])

    # Sorting
    if sort_by == "highest_budget":
        query += " ORDER BY t.total_budget DESC"
    elif sort_by == "lowest_pages":
        query += " ORDER BY CASE WHEN t.pages > 0 THEN t.pages ELSE 999 END ASC"
    elif sort_by == "nearest_deadline":
        query += " ORDER BY t.deadline ASC"
    else:
        query += " ORDER BY t.created_at DESC"

    tasks = conn.execute(query, tuple(params)).fetchall()
    
    # Get user skills for smart match scoring
    user_skills = []
    if current_user and current_user.get("role") == "junior" and current_user.get("skills"):
        try:
            user_skills = [s.lower() for s in (json.loads(current_user["skills"]) if isinstance(current_user["skills"], str) else current_user["skills"])]
        except Exception:
            user_skills = []

    now = datetime.now()
    results = []
    for row in tasks:
        t = dict(row)
        
        # Calculate deadline status and time remaining
        deadline_dt = None
        time_left_str = "No deadline"
        is_urgent = False
        is_warning = False
        try:
            deadline_dt = datetime.fromisoformat(t["deadline"].replace("Z", "+00:00").split("+")[0])
            diff = deadline_dt - now
            if diff.total_seconds() <= 0:
                time_left_str = "Past due"
                is_urgent = True
            else:
                days = diff.days
                hours = int(diff.seconds // 3600)
                minutes = int((diff.seconds % 3600) // 60)
                if days > 0:
                    time_left_str = f"{days}d {hours}h left"
                elif hours > 0:
                    time_left_str = f"{hours}h {minutes}m left"
                else:
                    time_left_str = f"{minutes}m left"
                
                if diff.total_seconds() < 6 * 3600:
                    is_urgent = True
                elif diff.total_seconds() < 24 * 3600:
                    is_warning = True
        except Exception:
            time_left_str = t["deadline"]

        # Calculate smart skill match percentage
        match_score = 75 # baseline
        if user_skills:
            text_corpus = f"{t['title']} {t['subject']} {t['category']} {t['description']}".lower()
            matched_count = sum(1 for s in user_skills if s in text_corpus)
            if matched_count > 0:
                match_score = min(98, 70 + (matched_count * 12))
            else:
                match_score = 65

        t["time_left_str"] = time_left_str
        t["is_urgent"] = is_urgent
        t["is_warning"] = is_warning
        t["match_score"] = match_score
        results.append(t)

    conn.close()
    return results

@router.get("/{task_id}")
def get_task_detail(task_id: int, current_user: Optional[dict] = Depends(get_current_user_optional)):
    conn = get_db_connection()
    task = conn.execute("""
        SELECT t.*, 
               u.anonymous_id as poster_anon_id, 
               u.rating as poster_rating,
               u.rating_count as poster_rating_count,
               u.branch as poster_branch,
               j.anonymous_id as junior_anon_id,
               j.rating as junior_rating,
               (SELECT COUNT(*) FROM applications WHERE task_id = t.id) as applications_count
        FROM tasks t
        JOIN users u ON t.poster_id = u.id
        LEFT JOIN users j ON t.assigned_junior_id = j.id
        WHERE t.id = ?
    """, (task_id,)).fetchone()

    if not task:
        conn.close()
        raise HTTPException(status_code=404, detail="Task not found.")

    t_dict = dict(task)

    # Check if current user has applied
    user_application = None
    if current_user:
        app = conn.execute("""
            SELECT * FROM applications WHERE task_id = ? AND applicant_id = ?
        """, (task_id, current_user["id"])).fetchone()
        if app:
            user_application = dict(app)

    # Calculate time left
    now = datetime.now()
    try:
        deadline_dt = datetime.fromisoformat(t_dict["deadline"].replace("Z", "+00:00").split("+")[0])
        diff = deadline_dt - now
        if diff.total_seconds() <= 0:
            t_dict["time_left_str"] = "Past due"
            t_dict["is_urgent"] = True
        else:
            days = diff.days
            hours = int(diff.seconds // 3600)
            minutes = int((diff.seconds % 3600) // 60)
            if days > 0:
                t_dict["time_left_str"] = f"{days}d {hours}h remaining"
            elif hours > 0:
                t_dict["time_left_str"] = f"{hours}h {minutes}m remaining"
            else:
                t_dict["time_left_str"] = f"{minutes}m remaining"
            t_dict["is_urgent"] = diff.total_seconds() < 6 * 3600
            t_dict["is_warning"] = diff.total_seconds() < 24 * 3600
    except Exception:
        t_dict["time_left_str"] = t_dict["deadline"]
        t_dict["is_urgent"] = False
        t_dict["is_warning"] = False

    t_dict["user_application"] = user_application
    conn.close()
    return t_dict

@router.post("")
def create_task(data: TaskCreate, current_user: dict = Depends(require_senior)):
    if not data.academic_integrity_confirmed:
        raise HTTPException(
            status_code=400,
            detail="You must confirm that this task complies with campus academic integrity rules."
        )

    # Calculate budget: pages * rate_per_page or fixed_budget
    total_budget = 0.0
    if data.pages and data.pages > 0 and data.rate_per_page and data.rate_per_page > 0:
        total_budget = round(float(data.pages) * float(data.rate_per_page), 2)
    elif data.fixed_budget and data.fixed_budget > 0:
        total_budget = round(float(data.fixed_budget), 2)
    else:
        raise HTTPException(status_code=400, detail="Please provide a valid number of pages & rate, or fixed budget.")

    conn = get_db_connection()
    user = conn.execute("SELECT wallet_balance, pending_balance FROM users WHERE id = ?", (current_user["id"],)).fetchone()
    
    # Check wallet balance
    if user["wallet_balance"] < total_budget:
        # Give automatic recharge for demo convenience if senior is low on balance
        conn.execute("UPDATE users SET wallet_balance = wallet_balance + ? WHERE id = ?", (total_budget + 500, current_user["id"]))
        conn.commit()
        user = conn.execute("SELECT wallet_balance, pending_balance FROM users WHERE id = ?", (current_user["id"],)).fetchone()

    # Lock budget in escrow from wallet_balance -> pending_balance
    new_wallet = user["wallet_balance"] - total_budget
    new_pending = user["pending_balance"] + total_budget
    conn.execute("""
        UPDATE users SET wallet_balance = ?, pending_balance = ? WHERE id = ?
    """, (new_wallet, new_pending, current_user["id"]))

    now = datetime.now().isoformat()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO tasks (
            poster_id, title, category, subject, pages, rate_per_page,
            fixed_budget, total_budget, deadline, difficulty, description,
            status, reference_file, academic_integrity_confirmed, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'OPEN', ?, 1, ?)
    """, (
        current_user["id"], data.title, data.category, data.subject,
        data.pages or 0, data.rate_per_page or 0.0, data.fixed_budget or 0.0,
        total_budget, data.deadline, data.difficulty or 'Medium',
        data.description, data.reference_file, now
    ))
    task_id = cursor.lastrowid

    # Record escrow transaction
    conn.execute("""
        INSERT INTO transactions (task_id, payer_id, amount, type, description, status, timestamp)
        VALUES (?, ?, ?, 'escrow_lock', ?, 'completed', ?)
    """, (task_id, current_user["id"], total_budget, f"Escrow reserved for '{data.title}'", now))

    conn.commit()
    conn.close()

    create_notification(
        current_user["id"],
        "Task Posted Successfully",
        f"Your task '{data.title}' is now live in the marketplace. ₹{total_budget:.0f} reserved in escrow.",
        "system",
        task_id
    )

    return {
        "success": True,
        "task_id": task_id,
        "total_budget": total_budget,
        "message": "Task published to campus marketplace."
    }

@router.post("/{task_id}/cancel")
def cancel_task(task_id: int, current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    task = conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
    if not task:
        conn.close()
        raise HTTPException(status_code=404, detail="Task not found.")

    if task["poster_id"] != current_user["id"] and current_user["role"] != "admin":
        conn.close()
        raise HTTPException(status_code=403, detail="Not authorized to cancel this task.")

    if task["status"] in ["COMPLETED", "SUBMITTED", "UNDER_REVIEW"]:
        conn.close()
        raise HTTPException(status_code=400, detail="Cannot cancel a task that is completed or submitted for review.")

    # Refund escrow back to poster's available balance
    poster = conn.execute("SELECT wallet_balance, pending_balance FROM users WHERE id = ?", (task["poster_id"],)).fetchone()
    if poster:
        refund_amount = task["total_budget"]
        new_wallet = poster["wallet_balance"] + refund_amount
        new_pending = max(0.0, poster["pending_balance"] - refund_amount)
        conn.execute("UPDATE users SET wallet_balance = ?, pending_balance = ? WHERE id = ?", (new_wallet, new_pending, task["poster_id"]))
        now = datetime.now().isoformat()
        conn.execute("""
            INSERT INTO transactions (task_id, receiver_id, amount, type, description, status, timestamp)
            VALUES (?, ?, ?, 'refund', ?, 'completed', ?)
        """, (task_id, task["poster_id"], refund_amount, f"Escrow refund for cancelled task #{task_id}", now))

    conn.execute("UPDATE tasks SET status = 'CANCELLED' WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()

    return {"success": True, "message": "Task cancelled and funds refunded to your wallet."}
