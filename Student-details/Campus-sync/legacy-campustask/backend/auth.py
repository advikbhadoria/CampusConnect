import hashlib
import secrets
import re
import random
from typing import Optional, Tuple
from fastapi import HTTPException, Header, Depends
from backend.database import get_db_connection

# Simple token storage in-memory for demo / session tokens
SESSION_TOKENS = {}

def hash_password(password: str) -> str:
    """Hash password using SHA-256 with salt."""
    salt = "CampusTask_2026_Salt_Secure!"
    return hashlib.sha256((password + salt).encode('utf-8')).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return hash_password(plain_password) == hashed_password

def generate_anonymous_id(role: str) -> str:
    """Generate unique anonymous ID like Senior #A482 or Junior #J194."""
    conn = get_db_connection()
    while True:
        if role == 'senior':
            prefix = "Senior #A"
            num = random.randint(100, 999)
        elif role == 'junior':
            prefix = "Junior #J"
            num = random.randint(100, 999)
        else:
            prefix = "Admin #AD"
            num = random.randint(10, 99)
        
        anon_id = f"{prefix}{num}"
        existing = conn.execute("SELECT id FROM users WHERE anonymous_id = ?", (anon_id,)).fetchone()
        if not existing:
            conn.close()
            return anon_id

def mask_sensitive_data(text: str) -> str:
    """Mask phone numbers and personal email addresses in text/chat messages for student safety."""
    if not text:
        return text
    # Mask 10-digit phone numbers and international formats
    phone_pattern = r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
    masked = re.sub(phone_pattern, '[Phone number protected for campus privacy]', text)
    # Mask external email addresses (keep @campus domain if needed, or mask all in chat)
    email_pattern = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
    masked = re.sub(email_pattern, '[Email protected for campus privacy]', masked)
    return masked

def create_access_token(user_id: int, role: str) -> str:
    token = secrets.token_hex(24)
    SESSION_TOKENS[token] = {
        "user_id": user_id,
        "role": role
    }
    return token

def get_current_user_optional(authorization: Optional[str] = Header(None)):
    if not authorization:
        return None
    token = authorization.replace("Bearer ", "").strip()
    session = SESSION_TOKENS.get(token)
    if not session:
        return None
    
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE id = ?", (session["user_id"],)).fetchone()
    conn.close()
    if not user:
        return None
    return dict(user)

def get_current_user(authorization: Optional[str] = Header(None)):
    user = get_current_user_optional(authorization)
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required. Please log in.")
    if user.get("verification_status") == "suspended":
        raise HTTPException(status_code=403, detail="Account is suspended. Contact administrator.")
    return user

def require_admin(user: dict = Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required.")
    return user

def require_senior(user: dict = Depends(get_current_user)):
    if user["role"] not in ["senior", "admin"]:
        raise HTTPException(status_code=403, detail="Senior role required to post tasks.")
    return user

def require_junior(user: dict = Depends(get_current_user)):
    if user["role"] not in ["junior", "admin"]:
        raise HTTPException(status_code=403, detail="Junior role required to apply for tasks.")
    return user
