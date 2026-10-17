import json
from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends
from backend.database import get_db_connection
from backend.auth import (
    hash_password, verify_password, generate_anonymous_id,
    create_access_token, get_current_user, get_current_user_optional, SESSION_TOKENS
)
from backend.schemas import UserRegister, UserLogin, UserProfileUpdate
from backend.notifications import create_notification

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/register")
def register(data: UserRegister):
    conn = get_db_connection()
    email_clean = data.college_email.strip().lower()
    
    # Check if email is already taken
    existing_email = conn.execute("SELECT id FROM users WHERE LOWER(college_email) = ?", (email_clean,)).fetchone()
    if existing_email:
        conn.close()
        raise HTTPException(status_code=400, detail="This college email is already registered. Please log in.")
    
    # Determine role (if not provided, year 1-2 = junior, 3-4 = senior)
    role = (data.role or "").strip().lower()
    if role not in ['senior', 'junior']:
        role = 'senior' if data.year >= 3 else 'junior'
    
    # Handle username / anonymous identity
    if data.username and data.username.strip():
        chosen_username = data.username.strip()
        existing_user = conn.execute("SELECT id FROM users WHERE LOWER(anonymous_id) = ?", (chosen_username.lower(),)).fetchone()
        if existing_user:
            conn.close()
            raise HTTPException(status_code=400, detail="Username is already taken. Please choose another username.")
        anon_id = chosen_username
    else:
        anon_id = generate_anonymous_id(role)
    
    pwd_hash = hash_password(data.password)
    now = datetime.now().isoformat()
    skills_json = json.dumps(data.skills if data.skills else [])
    phone_clean = (data.phone or "").strip()
    student_id_clean = data.student_id.strip()
    name_clean = data.name.strip()
    branch_clean = data.branch.strip()
    
    # Initial bonus balance for demo ease (₹1500 for senior to post tasks, ₹250 for junior)
    initial_balance = 1500.0 if role == 'senior' else 250.0

    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO users (
            anonymous_id, college_email, student_id, name, phone, password_hash,
            role, branch, year, skills, verification_status, rating, rating_count,
            wallet_balance, pending_balance, avatar_seed, bio, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'verified', 5.0, 0, ?, 0.0, ?, ?, ?)
    """, (
        anon_id, email_clean, student_id_clean, name_clean, phone_clean, pwd_hash,
        role, branch_clean, data.year, skills_json, initial_balance,
        anon_id.replace(" ", "_"), data.bio or "", now
    ))
    user_id = cursor.lastrowid
    conn.commit()
    conn.close()

    create_notification(
        user_id,
        "Welcome to CampusTask!",
        f"Your account is verified. Your campus handle is {anon_id}.",
        "system"
    )

    token = create_access_token(user_id, role)
    return {
        "token": token,
        "user": {
            "id": user_id,
            "anonymous_id": anon_id,
            "name": name_clean,
            "role": role,
            "branch": branch_clean,
            "year": data.year,
            "phone": phone_clean,
            "student_id": student_id_clean,
            "college_email": email_clean,
            "verification_status": "verified",
            "rating": 5.0,
            "wallet_balance": initial_balance,
            "skills": data.skills or []
        }
    }

@router.post("/login")
def login(data: UserLogin):
    identifier = (data.college_email or data.username or "").strip().lower()
    if not identifier:
        raise HTTPException(status_code=400, detail="Please provide your college email or username.")
    
    conn = get_db_connection()
    user = conn.execute(
        "SELECT * FROM users WHERE LOWER(college_email) = ? OR LOWER(anonymous_id) = ?",
        (identifier, identifier)
    ).fetchone()
    conn.close()

    if not user or not verify_password(data.password, user["password_hash"]):
        raise HTTPException(status_code=400, detail="Invalid username/email or password.")

    if user["verification_status"] == "suspended":
        raise HTTPException(status_code=403, detail="Account is suspended. Please contact administrator.")

    token = create_access_token(user["id"], user["role"])
    skills = []
    try:
        skills = json.loads(user["skills"]) if user["skills"] else []
    except Exception:
        skills = []

    return {
        "token": token,
        "user": {
            "id": user["id"],
            "anonymous_id": user["anonymous_id"],
            "name": user["name"],
            "role": user["role"],
            "branch": user["branch"],
            "year": user["year"],
            "phone": user["phone"] if "phone" in user.keys() else "",
            "student_id": user["student_id"],
            "college_email": user["college_email"],
            "verification_status": user["verification_status"],
            "rating": user["rating"],
            "rating_count": user["rating_count"],
            "wallet_balance": user["wallet_balance"],
            "pending_balance": user["pending_balance"],
            "skills": skills,
            "bio": user["bio"]
        }
    }

@router.get("/me")
def get_me(current_user: dict = Depends(get_current_user)):
    skills = []
    try:
        skills = json.loads(current_user["skills"]) if current_user.get("skills") else []
    except Exception:
        skills = []
    
    return {
        "id": current_user["id"],
        "anonymous_id": current_user["anonymous_id"],
        "name": current_user["name"],
        "role": current_user["role"],
        "branch": current_user["branch"],
        "year": current_user["year"],
        "phone": current_user["phone"] if "phone" in current_user.keys() else "",
        "student_id": current_user["student_id"],
        "college_email": current_user["college_email"],
        "verification_status": current_user["verification_status"],
        "rating": current_user["rating"],
        "rating_count": current_user["rating_count"],
        "wallet_balance": current_user["wallet_balance"],
        "pending_balance": current_user["pending_balance"],
        "skills": skills,
        "bio": current_user.get("bio", ""),
        "created_at": current_user.get("created_at")
    }

@router.patch("/profile")
def update_profile(data: UserProfileUpdate, current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    updates = []
    params = []

    if data.bio is not None:
        updates.append("bio = ?")
        params.append(data.bio)
    if data.skills is not None:
        updates.append("skills = ?")
        params.append(json.dumps(data.skills))
    if data.branch is not None:
        updates.append("branch = ?")
        params.append(data.branch)
    if data.year is not None:
        updates.append("year = ?")
        params.append(data.year)

    if updates:
        params.append(current_user["id"])
        query = f"UPDATE users SET {', '.join(updates)} WHERE id = ?"
        conn.execute(query, tuple(params))
        conn.commit()

    user = conn.execute("SELECT * FROM users WHERE id = ?", (current_user["id"],)).fetchone()
    conn.close()

    skills = []
    try:
        skills = json.loads(user["skills"]) if user["skills"] else []
    except Exception:
        skills = []

    return {
        "id": user["id"],
        "anonymous_id": user["anonymous_id"],
        "name": user["name"],
        "role": user["role"],
        "branch": user["branch"],
        "year": user["year"],
        "phone": user["phone"] if "phone" in user.keys() else "",
        "student_id": user["student_id"],
        "skills": skills,
        "bio": user["bio"]
    }

@router.get("/demo-users")
def get_demo_users():
    """Return preloaded demo users with quick login options for reviewers and judges."""
    conn = get_db_connection()
    users = conn.execute("""
        SELECT id, anonymous_id, name, role, branch, year, phone, student_id, skills, rating, wallet_balance, college_email
        FROM users 
        ORDER BY role DESC, id ASC
    """).fetchall()
    conn.close()

    result = []
    for u in users:
        skills = []
        try:
            skills = json.loads(u["skills"]) if u["skills"] else []
        except Exception:
            skills = []
        result.append({
            "id": u["id"],
            "anonymous_id": u["anonymous_id"],
            "name": u["name"],
            "role": u["role"],
            "branch": u["branch"],
            "year": u["year"],
            "phone": u["phone"] if "phone" in u.keys() else "",
            "student_id": u["student_id"],
            "skills": skills,
            "rating": u["rating"],
            "wallet_balance": u["wallet_balance"],
            "college_email": u["college_email"]
        })
    return result

@router.post("/switch-demo/{user_id}")
def switch_demo_user(user_id: int):
    """Instantly switches context to selected demo user without password for rapid hackathon testing."""
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    conn.close()

    if not user:
        raise HTTPException(status_code=404, detail="Demo user not found.")

    token = create_access_token(user["id"], user["role"])
    skills = []
    try:
        skills = json.loads(user["skills"]) if user["skills"] else []
    except Exception:
        skills = []

    return {
        "token": token,
        "user": {
            "id": user["id"],
            "anonymous_id": user["anonymous_id"],
            "name": user["name"],
            "role": user["role"],
            "branch": user["branch"],
            "year": user["year"],
            "phone": user["phone"] if "phone" in user.keys() else "",
            "student_id": user["student_id"],
            "college_email": user["college_email"],
            "verification_status": user["verification_status"],
            "rating": user["rating"],
            "rating_count": user["rating_count"],
            "wallet_balance": user["wallet_balance"],
            "pending_balance": user["pending_balance"],
            "skills": skills,
            "bio": user["bio"]
        }
    }
