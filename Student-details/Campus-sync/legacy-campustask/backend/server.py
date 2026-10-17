import os
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.auth_routes import router as auth_router
from backend.routes.task_routes import router as task_router
from backend.routes.application_routes import router as application_router
from backend.routes.chat_routes import router as chat_router
from backend.routes.submission_routes import router as submission_router
from backend.routes.wallet_routes import router as wallet_router
from backend.routes.review_routes import router as review_router
from backend.routes.notification_routes import router as notification_router
from backend.routes.dispute_routes import router as dispute_router
from backend.routes.admin_routes import router as admin_router
from backend.routes.upload_routes import router as upload_router
from backend.database import init_db

# Initialize database
init_db()

app = FastAPI(
    title="CampusTask API",
    description="Campus-Only Anonymous Peer Task Marketplace for Verified College Students",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(auth_router)
app.include_router(task_router)
app.include_router(application_router)
app.include_router(chat_router)
app.include_router(submission_router)
app.include_router(wallet_router)
app.include_router(review_router)
app.include_router(notification_router)
app.include_router(dispute_router)
app.include_router(admin_router)
app.include_router(upload_router)

# Static and Upload directories
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_DIR = os.path.join(BASE_DIR, "static")
UPLOAD_DIR = os.path.join(STATIC_DIR, "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "CampusTask", "version": "1.0.0"}

# PWA & SPA Catch-all route to serve index.html
@app.get("/manifest.json")
def get_manifest():
    return FileResponse(os.path.join(STATIC_DIR, "manifest.json"), media_type="application/manifest+json")

@app.get("/sw.js")
def get_sw():
    return FileResponse(os.path.join(STATIC_DIR, "sw.js"), media_type="application/javascript")

@app.get("/{full_path:path}")
def serve_spa(full_path: str):
    # Check if the requested file exists in static directory
    potential_file = os.path.join(STATIC_DIR, full_path)
    if full_path and os.path.exists(potential_file) and os.path.isfile(potential_file):
        return FileResponse(potential_file)
    # Default to index.html for Single Page Application routing
    index_file = os.path.join(STATIC_DIR, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return JSONResponse(status_code=404, content={"detail": "Not found"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.server:app", host="0.0.0.0", port=8000, reload=True)
