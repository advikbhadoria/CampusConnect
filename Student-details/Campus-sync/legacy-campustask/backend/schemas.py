from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Union
from datetime import datetime

class UserRegister(BaseModel):
    name: str
    student_id: str # Registration / Roll number
    college_email: str
    password: str
    branch: str
    year: int
    phone: Optional[str] = ""
    username: Optional[str] = None # Custom chosen anonymous username
    role: Optional[str] = None # 'senior' or 'junior', auto-derived if omitted
    skills: Optional[List[str]] = []
    bio: Optional[str] = ""

class UserLogin(BaseModel):
    college_email: Optional[str] = None # Accepts either college email or username
    username: Optional[str] = None
    password: str

class UserProfileUpdate(BaseModel):
    bio: Optional[str] = None
    skills: Optional[List[str]] = None
    branch: Optional[str] = None
    year: Optional[int] = None

class TaskCreate(BaseModel):
    title: str
    category: str
    subject: str
    pages: Optional[int] = 0
    rate_per_page: Optional[float] = 0.0
    fixed_budget: Optional[float] = 0.0
    deadline: str # ISO string
    difficulty: Optional[str] = "Medium"
    description: str
    academic_integrity_confirmed: bool = True
    reference_file: Optional[str] = None

class ApplicationCreate(BaseModel):
    task_id: int
    proposed_price: float
    estimated_time: str
    message: str

class ApplicationDecision(BaseModel):
    application_id: int
    decision: str # 'accepted' or 'rejected'

class MessageCreate(BaseModel):
    task_id: int
    receiver_id: int
    message: str
    attachment: Optional[str] = None

class TaskSubmission(BaseModel):
    task_id: int
    submission_note: str
    submission_file: Optional[str] = None

class ReviewCreate(BaseModel):
    task_id: int
    rating: int = Field(..., ge=1, le=5)
    comment: Optional[str] = ""

class DisputeCreate(BaseModel):
    task_id: int
    reason: str
    description: str
    evidence_file: Optional[str] = None

class DisputeResolve(BaseModel):
    dispute_id: int
    action: str # 'refund_senior', 'release_junior', 'dismiss'
    admin_notes: Optional[str] = ""

class WalletAction(BaseModel):
    action: str # 'deposit' or 'withdraw'
    amount: float = Field(..., gt=0)
    note: Optional[str] = ""

class CategoryCreate(BaseModel):
    name: str
    icon: str
    description: Optional[str] = ""
