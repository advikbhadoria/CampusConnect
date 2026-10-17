import os
import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.auth import get_current_user

router = APIRouter(prefix="/api/upload", tags=["upload"])

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "static", "uploads")
ALLOWED_EXTENSIONS = {".pdf", ".docx", ".doc", ".png", ".jpg", ".jpeg", ".pptx", ".ppt", ".xlsx", ".csv", ".txt", ".zip"}

@router.post("")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No filename provided.")

    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"File extension {ext} not permitted. Allowed: {', '.join(ALLOWED_EXTENSIONS)}")

    # 10MB size limit
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    unique_name = f"{uuid.uuid4().hex[:10]}_{file.filename.replace(' ', '_')}"
    target_path = os.path.join(UPLOAD_DIR, unique_name)

    content = await file.read()
    if len(content) > 15 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size exceeds 15MB maximum limit.")

    with open(target_path, "wb") as f:
        f.write(content)

    return {
        "success": True,
        "filename": unique_name,
        "original_name": file.filename,
        "url": f"/uploads/{unique_name}",
        "size_kb": round(len(content) / 1024, 1)
    }
