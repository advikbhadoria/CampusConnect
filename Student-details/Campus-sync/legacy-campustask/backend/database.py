import sqlite3
import os
import json
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "campustask.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH, timeout=30.0)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    conn.execute("PRAGMA journal_mode = WAL;")
    conn.execute("PRAGMA busy_timeout = 30000;")
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Users Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        anonymous_id TEXT UNIQUE NOT NULL,
        college_email TEXT UNIQUE NOT NULL,
        student_id TEXT NOT NULL,
        name TEXT NOT NULL,
        phone TEXT DEFAULT '',
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('senior', 'junior', 'admin')),
        branch TEXT NOT NULL,
        year INTEGER NOT NULL,
        skills TEXT DEFAULT '[]',
        verification_status TEXT DEFAULT 'verified' CHECK(verification_status IN ('verified', 'pending', 'suspended')),
        rating REAL DEFAULT 5.0,
        rating_count INTEGER DEFAULT 0,
        wallet_balance REAL DEFAULT 0.0,
        pending_balance REAL DEFAULT 0.0,
        avatar_seed TEXT,
        bio TEXT DEFAULT '',
        created_at TEXT NOT NULL
    );
    """)

    try:
        cursor.execute("ALTER TABLE users ADD COLUMN phone TEXT DEFAULT '';")
    except Exception:
        pass

    # Categories Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        icon TEXT NOT NULL,
        description TEXT,
        is_active INTEGER DEFAULT 1
    );
    """)

    # Tasks Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        poster_id INTEGER NOT NULL,
        assigned_junior_id INTEGER,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        subject TEXT NOT NULL,
        pages INTEGER DEFAULT 0,
        rate_per_page REAL DEFAULT 0.0,
        fixed_budget REAL DEFAULT 0.0,
        total_budget REAL NOT NULL,
        deadline TEXT NOT NULL,
        difficulty TEXT DEFAULT 'Medium' CHECK(difficulty IN ('Easy', 'Medium', 'Hard')),
        description TEXT NOT NULL,
        status TEXT DEFAULT 'OPEN' CHECK(status IN ('OPEN', 'APPLICATIONS', 'ASSIGNED', 'IN_PROGRESS', 'SUBMITTED', 'UNDER_REVIEW', 'COMPLETED', 'DISPUTED', 'CANCELLED')),
        reference_file TEXT,
        submission_file TEXT,
        submission_note TEXT,
        submitted_at TEXT,
        completed_at TEXT,
        academic_integrity_confirmed INTEGER DEFAULT 1,
        created_at TEXT NOT NULL,
        FOREIGN KEY (poster_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (assigned_junior_id) REFERENCES users(id) ON DELETE SET NULL
    );
    """)

    # Applications Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id INTEGER NOT NULL,
        applicant_id INTEGER NOT NULL,
        proposed_price REAL NOT NULL,
        estimated_time TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'accepted', 'rejected')),
        created_at TEXT NOT NULL,
        FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
        FOREIGN KEY (applicant_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE(task_id, applicant_id)
    );
    """)

    # Messages Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id INTEGER NOT NULL,
        sender_id INTEGER NOT NULL,
        receiver_id INTEGER NOT NULL,
        message TEXT NOT NULL,
        attachment TEXT,
        is_read INTEGER DEFAULT 0,
        timestamp TEXT NOT NULL,
        FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
        FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
    );
    """)

    # Transactions Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id INTEGER,
        payer_id INTEGER,
        receiver_id INTEGER,
        amount REAL NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('escrow_lock', 'escrow_release', 'withdrawal', 'deposit', 'refund')),
        description TEXT NOT NULL,
        status TEXT DEFAULT 'completed' CHECK(status IN ('completed', 'pending', 'failed')),
        timestamp TEXT NOT NULL,
        FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE SET NULL,
        FOREIGN KEY (payer_id) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE SET NULL
    );
    """)

    # Reviews Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id INTEGER NOT NULL,
        reviewer_id INTEGER NOT NULL,
        reviewed_user_id INTEGER NOT NULL,
        rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TEXT NOT NULL,
        FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
        FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (reviewed_user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE(task_id, reviewer_id)
    );
    """)

    # Notifications Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        type TEXT DEFAULT 'system',
        link_task_id INTEGER,
        read INTEGER DEFAULT 0,
        timestamp TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    """)

    # Reports Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        reporter_id INTEGER NOT NULL,
        reported_user_id INTEGER,
        task_id INTEGER,
        reason TEXT NOT NULL,
        description TEXT NOT NULL,
        evidence_file TEXT,
        status TEXT DEFAULT 'open' CHECK(status IN ('open', 'under_review', 'resolved', 'dismissed')),
        admin_notes TEXT,
        created_at TEXT NOT NULL,
        FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (reported_user_id) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE SET NULL
    );
    """)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully.")
