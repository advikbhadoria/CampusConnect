# 🎓 CampusTask — Verified Campus Peer Marketplace

> **"Seniors save time. Juniors earn. Campus connects."**

CampusTask is a **Progressive Web App (PWA)** built exclusively for college campuses. It anonymously connects busy senior students (who have limited time due to internships, placements, and capstone projects) with first-year/junior students who want flexible campus earning opportunities by providing **legitimate, permitted academic assistance**.

---

## ⚖️ 1. Strict Academic Integrity Positioning

CampusTask is explicitly positioned for **legitimate peer assistance and academic productivity**:
- 📝 **Assignment Formatting & Layout Cleaning** (SP46, IEEE margins, typography)
- 📚 **Notes Preparation & Summaries** (Formula sheets, digitized whiteboard notes)
- 📊 **Presentation / PPT Deck Preparation**
- 🔍 **Research Assistance & Citation Indexing** (IEEE, APA, DOI verification)
- 📈 **Excel Work & Observation Data Entry**
- 📐 **Diagrams, Flowcharts & 2D CAD Blueprint Drafting**
- ✨ **Proofreading & Grammar / Syntax Polishing**
- 🎓 **1-on-1 Concept Tutoring & Doubt Solving**
- 🖨️ **Printing & Scanning Assistance**

*Academic integrity notices and affirmation checkboxes are enforced during task creation.*

---

## 🚀 2. Key Architecture & Features

### 🛡️ Campus Verification & 100% Anonymous Identity
- Only verified college emails (`@campus.edu`, `@*.ac.in`) are admitted.
- Students interact strictly through auto-generated anonymous handles: `Senior #A482`, `Junior #J194`, etc.
- Real student names and roll numbers are visible **only** to the platform administrator.

### 📱 Progressive Web App (PWA)
- **Manifest (`manifest.json`)**: App icons, theme color (`#6366f1`), shortcuts, standalone native feel.
- **Service Worker (`sw.js`)**: Offline task caching, app shell pre-caching, push notification handlers.
- **Mobile-First UX**: Native bottom navigation bar, touch-friendly task cards, instant live search.

### 💰 Automated Escrow & Simulated Student Wallet
- **Budget Auto-Calculator**: `pages × rate_per_page` (e.g. 20 pages × ₹20 = ₹400) or fixed budget.
- **Automated Escrow Lock**: Senior's budget is locked in escrow when the task is posted/assigned.
- **Instant Release**: Funds transfer immediately to Junior's available balance upon Senior's approval.
- **Prototype Ledger**: Full credit/debit transaction history with simulated UPI deposit and withdrawal.

### 💬 Private Task-Specific Chat with Privacy Shield
- Real-time anonymous messaging between Senior and assigned Junior.
- File attachment sharing for drafts, reference notes, and completed files.
- **Automated Privacy Masking**: Phone numbers and external personal emails are automatically detected and masked in chat.

### 🔄 End-to-End Task Lifecycle
$$\text{OPEN} \longrightarrow \text{APPLICATIONS} \longrightarrow \text{ASSIGNED} \longrightarrow \text{IN PROGRESS} \longrightarrow \text{SUBMITTED} \longrightarrow \text{COMPLETED} \longrightarrow \text{RATED}$$

---

## ⚡ 3. Quick Start & Demo Credentials

### Start the Server
```bash
PYTHONPATH=. python3 -m uvicorn backend.server:app --host 127.0.0.1 --port 8000
```
Open **[http://127.0.0.1:8000](http://127.0.0.1:8000)** in your browser.

### 1-Click Demo Sandbox Switcher
Use the **"⚡ Demo Sandbox"** pill in the top navigation bar to switch between test roles instantly without typing passwords:

| Role | Anonymous ID | Email | Password | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Senior (Task Poster)** | `Senior #A482` | `aravind.k@campus.edu` | `password123` | Post tasks, review applications, approve work |
| **Senior (Mechanical)** | `Senior #A731` | `rohit.mehta@campus.edu` | `password123` | Active CAD/diagram tasks |
| **Junior (Earner)** | `Junior #J194` | `ananya.s@campus.edu` | `password123` | Browse tasks, apply, submit work, wallet payout |
| **Junior (ECE)** | `Junior #J628` | `karthik.r@campus.edu` | `password123` | Circuits, schematics, engineering math |
| **Administrator** | `Admin #AD01` | `admin@campus.edu` | `password123` | Student identity registry, dispute resolution |

---

## 🧪 4. Complete Step-by-Step Demo Flow

1. **Step 1 — Senior logs in**: Switch to `Senior #A482`.
2. **Step 2 — Senior Posts a Task**: Click `+ Post Task` -> Enter `20 pages` @ `₹20/page`, Subject `Mathematics` -> Budget automatically calculates to `₹400`. Confirm academic integrity and publish.
3. **Step 3 — Task appears in Marketplace**: Listed with budget `₹400` and deadline countdown.
4. **Step 4 — Junior logs in**: Switch to `Junior #J194`. Open the Mathematics task and click `Apply` (proposed price: ₹400, ETA: "Tomorrow 6 PM").
5. **Step 5 — Senior Accepts Junior**: Switch back to `Senior #A482`, open the task, and click `Accept Junior`. Task transitions to `ASSIGNED`.
6. **Step 6 — Anonymous Chat**: Click `Open Anonymous Chat` and coordinate delivery.
7. **Step 7 — Junior Delivers Work**: Switch to `Junior #J194`, click `Upload & Submit Completed Work`, attach document and delivery note. Task becomes `SUBMITTED`.
8. **Step 8 — Senior Approves Completion**: Switch to `Senior #A482`, click `Approve Work & Release ₹400 Payment`.
9. **Step 9 — Wallet Credited**: `₹400` moves to Junior's available wallet balance.
10. **Step 10 — 5-Star Ratings**: Both parties submit 5-star ratings & peer feedback.

---

## 🛠️ 5. Technology Stack

- **Backend**: Python 3, FastAPI, Uvicorn, Pydantic v2
- **Database**: SQLite with WAL mode & PostgreSQL-ready relational architecture
- **Frontend**: HTML5, Vanilla JavaScript (Modular SPA architecture), Vanilla CSS3 Design System
- **PWA**: Web App Manifest (`manifest.json`), Service Worker (`sw.js`), Cache-first offline fallback
