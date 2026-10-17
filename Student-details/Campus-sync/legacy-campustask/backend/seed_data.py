import json
from datetime import datetime, timedelta
from backend.database import init_db, get_db_connection
from backend.auth import hash_password

def seed_database():
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()

    # Clear existing data for fresh clean seed
    tables = ["reviews", "messages", "applications", "transactions", "notifications", "reports", "tasks", "categories", "users"]
    for t in tables:
        cursor.execute(f"DELETE FROM {t}")

    now = datetime.now()

    # 1. Seed Categories
    categories = [
        ("Assignment Assistance", "📝", "Permitted formatting, equation typing, and layout cleaning."),
        ("Notes Preparation", "📚", "Neat digitized summaries, formula sheets, and class notes."),
        ("Presentation / PPT", "📊", "Clean slide deck formatting, visual alignment, and charts."),
        ("Research Assistance", "🔍", "Literature lookup, reference formatting, and paper indexing."),
        ("Excel & Data Entry", "📈", "Spreadsheet cleanup, graphing, calculations, and tables."),
        ("Programming & Debugging", "💻", "Code structure help, comments, environment setup, and test runs."),
        ("Diagrams & CAD", "📐", "Circuits, block diagrams, Flowcharts, UML, and CAD sketches."),
        ("Formatting & LaTeX", "📄", "IEEE formatting, thesis styling, and equation typesetting."),
        ("Proofreading", "✨", "Grammar, syntax, flow, and clarity improvement."),
        ("Tutoring & Doubt Solving", "🎓", "1-on-1 concept explanation and textbook doubt solving."),
        ("Printing & Scanning", "🖨️", "Document printing, multi-page scanning, and campus binding.")
    ]

    for name, icon, desc in categories:
        cursor.execute("INSERT INTO categories (name, icon, description, is_active) VALUES (?, ?, ?, 1)", (name, icon, desc))

    # 2. Seed Users (Seniors, Juniors, Admin)
    users_data = [
        # Admin
        {
            "anon": "Admin #AD01", "email": "admin@campus.edu", "student_id": "ADM202001",
            "name": "Prof. Vikram Malhotra (Dean of Academics Office)", "role": "admin",
            "branch": "Campus Administration", "year": 4, "skills": ["Policy Moderation", "Verification"],
            "rating": 5.0, "rating_count": 45, "wallet": 50000.0, "pending": 0.0, "bio": "CampusTask Administrator & Compliance Officer."
        },
        # Seniors
        {
            "anon": "Senior #A482", "email": "aravind.k@campus.edu", "student_id": "2022CS0482",
            "name": "Aravind Krishnamurthy", "role": "senior",
            "branch": "Computer Science & Engineering", "year": 4,
            "skills": ["Distributed Systems", "Cloud Computing", "Python", "System Design"],
            "rating": 4.9, "rating_count": 18, "wallet": 3400.0, "pending": 400.0,
            "bio": "4th Year CSE | Pre-placement intern @ TechCorp. Looking for reliable juniors for permitted lab formatting & documentation."
        },
        {
            "anon": "Senior #A731", "email": "rohit.mehta@campus.edu", "student_id": "2022ME0731",
            "name": "Rohit Mehta", "role": "senior",
            "branch": "Mechanical Engineering", "year": 4,
            "skills": ["Thermal Engineering", "AutoCAD", "MATLAB", "Finite Element Analysis"],
            "rating": 4.8, "rating_count": 12, "wallet": 2100.0, "pending": 350.0,
            "bio": "Final year Mechanical | Busy with capstone project. Need neat notes and report formatting."
        },
        {
            "anon": "Senior #A194", "email": "sneha.patel@campus.edu", "student_id": "2022EC0194",
            "name": "Sneha Patel", "role": "senior",
            "branch": "Electronics & Communication", "year": 4,
            "skills": ["VLSI Design", "Signal Processing", "LaTeX", "Verilog"],
            "rating": 5.0, "rating_count": 14, "wallet": 1800.0, "pending": 0.0,
            "bio": "ECE 4th Year. Love helping juniors learn while delegating clean presentation & diagram work."
        },
        {
            "anon": "Senior #A519", "email": "dev.sharma@campus.edu", "student_id": "2022EE0519",
            "name": "Dev Sharma", "role": "senior",
            "branch": "Electrical Engineering", "year": 4,
            "skills": ["Power Systems", "Control Theory", "Simulink", "Excel Modeling"],
            "rating": 4.7, "rating_count": 9, "wallet": 1250.0, "pending": 0.0,
            "bio": "Electrical Eng senior. Preparing for GATE. Glad to connect with motivated 1st & 2nd years."
        },
        {
            "anon": "Senior #A902", "email": "tanvi.iyer@campus.edu", "student_id": "2022BT0902",
            "name": "Tanvi Iyer", "role": "senior",
            "branch": "Biotechnology", "year": 4,
            "skills": ["Bioinformatics", "Research Methodologies", "Scientific Writing"],
            "rating": 4.9, "rating_count": 16, "wallet": 2600.0, "pending": 0.0,
            "bio": "Biotech 4th year. Need assistance with literature indexation and bibliography formatting."
        },

        # Juniors / First-Year Students
        {
            "anon": "Junior #J194", "email": "ananya.s@campus.edu", "student_id": "2025CS0194",
            "name": "Ananya Sharma", "role": "junior",
            "branch": "Computer Science & Engineering", "year": 1,
            "skills": ["Mathematics", "Python", "LaTeX", "Excel", "PPT Formatting", "Proofreading"],
            "rating": 4.9, "rating_count": 18, "wallet": 1250.0, "pending": 400.0,
            "bio": "1st Year CSE | Quick turnaround, clean formatting, accurate formulas and clear slide decks."
        },
        {
            "anon": "Junior #J628", "email": "karthik.r@campus.edu", "student_id": "2025EC0628",
            "name": "Karthik Raman", "role": "junior",
            "branch": "Electronics & Communication", "year": 1,
            "skills": ["Circuit Diagrams", "Engineering Mathematics", "Physics Notes", "Diagrams & CAD"],
            "rating": 4.8, "rating_count": 11, "wallet": 850.0, "pending": 350.0,
            "bio": "1st Year ECE | High precision drawing, circuit schematics, and neat formula notes."
        },
        {
            "anon": "Junior #J842", "email": "priya.verma@campus.edu", "student_id": "2025ME0842",
            "name": "Priya Verma", "role": "junior",
            "branch": "Mechanical Engineering", "year": 1,
            "skills": ["Engineering Drawing", "SolidWorks", "Proofreading", "Presentation / PPT"],
            "rating": 5.0, "rating_count": 15, "wallet": 1900.0, "pending": 0.0,
            "bio": "1st Year Mech. Skilled in technical drawings, clean typography and slide aesthetics."
        },
        {
            "anon": "Junior #J315", "email": "vikas.singh@campus.edu", "student_id": "2024CS0315",
            "name": "Vikas Singh", "role": "junior",
            "branch": "Computer Science", "year": 2,
            "skills": ["C++", "Python", "Data Structures", "Excel & Data Entry", "Mathematics"],
            "rating": 4.7, "rating_count": 8, "wallet": 620.0, "pending": 0.0,
            "bio": "2nd Year CSE. Fast typer, attentive to details and deadline-focused."
        },
        {
            "anon": "Junior #J728", "email": "neha.nair@campus.edu", "student_id": "2025BT0728",
            "name": "Neha Nair", "role": "junior",
            "branch": "Biotechnology", "year": 1,
            "skills": ["Research Assistance", "Proofreading", "Notes Preparation", "Citation / References"],
            "rating": 4.9, "rating_count": 7, "wallet": 540.0, "pending": 0.0,
            "bio": "1st Year Biotech. Meticulous with citations, IEEE/APA formats and grammar."
        },
        {
            "anon": "Junior #J451", "email": "arjun.das@campus.edu", "student_id": "2024CE0451",
            "name": "Arjun Das", "role": "junior",
            "branch": "Civil Engineering", "year": 2,
            "skills": ["AutoCAD", "Surveying Calculations", "Excel", "Report Formatting"],
            "rating": 4.6, "rating_count": 5, "wallet": 320.0, "pending": 0.0,
            "bio": "2nd Year Civil. Available on weekends for spreadsheet analysis and CAD blueprints."
        }
    ]

    user_id_map = {}
    for u in users_data:
        pwd = hash_password("password123")
        cursor.execute("""
            INSERT INTO users (
                anonymous_id, college_email, student_id, name, password_hash,
                role, branch, year, skills, verification_status, rating, rating_count,
                wallet_balance, pending_balance, avatar_seed, bio, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'verified', ?, ?, ?, ?, ?, ?, ?)
        """, (
            u["anon"], u["email"], u["student_id"], u["name"], pwd,
            u["role"], u["branch"], u["year"], json.dumps(u["skills"]),
            u["rating"], u["rating_count"], u["wallet"], u["pending"],
            u["anon"].replace(" ", "_"), u["bio"], (now - timedelta(days=60)).isoformat()
        ))
        user_id_map[u["anon"]] = cursor.lastrowid

    # 3. Seed Realistic Tasks
    tasks_data = [
        # Active OPEN tasks in marketplace
        {
            "poster": "Senior #A482", "title": "Engineering Mathematics Assignment Formatting",
            "category": "Assignment Assistance", "subject": "Engineering Mathematics",
            "pages": 20, "rate_per_page": 20.0, "fixed_budget": 0.0, "total_budget": 400.0,
            "deadline": (now + timedelta(days=2, hours=4)).isoformat(), "difficulty": "Medium",
            "status": "OPEN", "desc": "Clean typesetting of 20 pages of handwritten differential equations into clean document layout with properly numbered equations.",
            "ref_file": "math_sample_notes.pdf"
        },
        {
            "poster": "Senior #A731", "title": "Thermodynamics Lab Report Diagrams & Flowcharts",
            "category": "Diagrams & CAD", "subject": "Applied Thermodynamics",
            "pages": 8, "rate_per_page": 35.0, "fixed_budget": 0.0, "total_budget": 280.0,
            "deadline": (now + timedelta(hours=14)).isoformat(), "difficulty": "Medium",
            "status": "OPEN", "desc": "Need 6 neat vector schematic diagrams drawn (Rankine cycle, P-V diagrams) to accompany the permitted lab observation notes.",
            "ref_file": "thermo_sketches.png"
        },
        {
            "poster": "Senior #A194", "title": "VLSI Design Seminar Presentation Slide Deck",
            "category": "Presentation / PPT", "subject": "VLSI Design & Architecture",
            "pages": 15, "rate_per_page": 25.0, "fixed_budget": 0.0, "total_budget": 375.0,
            "deadline": (now + timedelta(days=3)).isoformat(), "difficulty": "Easy",
            "status": "OPEN", "desc": "Format 15 slides from rough outline text into a sleek modern dark/light PPT with clean typography and block diagrams.",
            "ref_file": "vlsi_outline.docx"
        },
        {
            "poster": "Senior #A519", "title": "Power Electronics Waveform Data Entry & Plotting",
            "category": "Excel & Data Entry", "subject": "Power Electronics",
            "pages": 0, "rate_per_page": 0.0, "fixed_budget": 300.0, "total_budget": 300.0,
            "deadline": (now + timedelta(hours=8)).isoformat(), "difficulty": "Easy",
            "status": "OPEN", "desc": "Digitize 5 oscilloscope table logs into Excel with formatted columns, summary statistics and auto-generated line charts.",
            "ref_file": "cro_readings.jpg"
        },
        {
            "poster": "Senior #A902", "title": "Bioinformatics Research Paper Citation Indexing",
            "category": "Research Assistance", "subject": "Computational Biology",
            "pages": 12, "rate_per_page": 25.0, "fixed_budget": 0.0, "total_budget": 300.0,
            "deadline": (now + timedelta(days=4)).isoformat(), "difficulty": "Medium",
            "status": "OPEN", "desc": "Collect and format 25 references in IEEE and APA style with DOI links and verified authors for my project literature survey.",
            "ref_file": "references_draft.txt"
        },
        {
            "poster": "Senior #A482", "title": "Python Script Documentation & Code Flowcharts",
            "category": "Programming & Debugging", "subject": "Data Structures & Algorithms",
            "pages": 0, "rate_per_page": 0.0, "fixed_budget": 450.0, "total_budget": 450.0,
            "deadline": (now + timedelta(days=1, hours=18)).isoformat(), "difficulty": "Medium",
            "status": "OPEN", "desc": "Add clean docstrings, module comments, and generate clean flowchart diagrams for 3 tree traversal algorithms.",
            "ref_file": "tree_traversal.py"
        },
        {
            "poster": "Senior #A731", "title": "Fluid Mechanics Lecture Notes Transcription",
            "category": "Notes Preparation", "subject": "Fluid Mechanics",
            "pages": 18, "rate_per_page": 18.0, "fixed_budget": 0.0, "total_budget": 324.0,
            "deadline": (now + timedelta(days=5)).isoformat(), "difficulty": "Easy",
            "status": "OPEN", "desc": "Transcribe audio lecture highlights and whiteboard snapshots into clean, readable Markdown/PDF summary notes.",
            "ref_file": "fluids_whiteboard.jpg"
        },
        {
            "poster": "Senior #A194", "title": "Microprocessor 8086 Instruction Summary Sheet",
            "category": "Notes Preparation", "subject": "Microprocessors",
            "pages": 10, "rate_per_page": 20.0, "fixed_budget": 0.0, "total_budget": 200.0,
            "deadline": (now + timedelta(days=2)).isoformat(), "difficulty": "Easy",
            "status": "OPEN", "desc": "Create a 2-page cheat sheet organizing 8086 opcodes, addressing modes, and flag effects in clean tabular format.",
            "ref_file": "8086_raw.txt"
        },
        {
            "poster": "Senior #A519", "title": "MATLAB Simulation Report Proofreading & Formatting",
            "category": "Proofreading", "subject": "Control Systems",
            "pages": 16, "rate_per_page": 15.0, "fixed_budget": 0.0, "total_budget": 240.0,
            "deadline": (now + timedelta(days=3, hours=12)).isoformat(), "difficulty": "Easy",
            "status": "OPEN", "desc": "Check grammar, caption alignment, and figure references in a 16-page root locus and Bode plot lab documentation.",
            "ref_file": "control_systems_draft.pdf"
        },
        {
            "poster": "Senior #A902", "title": "Genetics Lab Observation Table Cleanup",
            "category": "Excel & Data Entry", "subject": "Molecular Genetics",
            "pages": 6, "rate_per_page": 30.0, "fixed_budget": 0.0, "total_budget": 180.0,
            "deadline": (now + timedelta(hours=5)).isoformat(), "difficulty": "Easy",
            "status": "OPEN", "desc": "Urgent formatting of gel electrophoresis observation tables with mean ± standard deviation formulas.",
            "ref_file": "genetics_table.xlsx"
        },
        {
            "poster": "Senior #A482", "title": "1-on-1 Concept Tutoring: Dynamic Programming Basics",
            "category": "Tutoring & Doubt Solving", "subject": "Computer Science",
            "pages": 0, "rate_per_page": 0.0, "fixed_budget": 500.0, "total_budget": 500.0,
            "deadline": (now + timedelta(days=4)).isoformat(), "difficulty": "Hard",
            "status": "OPEN", "desc": "Help a fellow student understand 0/1 Knapsack and LCS recursion tree visualization over 45 minutes on Google Meet/voice.",
            "ref_file": None
        },
        {
            "poster": "Senior #A731", "title": "CAD 2D Blueprint Orthographic Projection Drawing",
            "category": "Diagrams & CAD", "subject": "Machine Drawing",
            "pages": 4, "rate_per_page": 75.0, "fixed_budget": 0.0, "total_budget": 300.0,
            "deadline": (now + timedelta(days=1, hours=6)).isoformat(), "difficulty": "Hard",
            "status": "OPEN", "desc": "Draft Front, Top, and Side views in AutoCAD for a flange coupling with standard dimensioning according to SP46.",
            "ref_file": "flange_sketch.jpg"
        },

        # Active IN_PROGRESS / ASSIGNED task for Senior #A482 & Junior #J194
        {
            "poster": "Senior #A482", "assigned_to": "Junior #J194",
            "title": "Machine Learning Lab Observations Table Formatting",
            "category": "Formatting & LaTeX", "subject": "Machine Learning",
            "pages": 14, "rate_per_page": 25.0, "fixed_budget": 0.0, "total_budget": 350.0,
            "deadline": (now + timedelta(days=1, hours=10)).isoformat(), "difficulty": "Medium",
            "status": "IN_PROGRESS",
            "desc": "Format 14 pages of confusion matrices, accuracy tables, and hyperparameter logs into clean LaTeX IEEE report.",
            "ref_file": "ml_logs.csv"
        },

        # SUBMITTED Task awaiting Senior review
        {
            "poster": "Senior #A731", "assigned_to": "Junior #J628",
            "title": "Kinematics Mechanism Synthesis Diagram Drawing",
            "category": "Diagrams & CAD", "subject": "Kinematics of Machinery",
            "pages": 5, "rate_per_page": 50.0, "fixed_budget": 0.0, "total_budget": 250.0,
            "deadline": (now + timedelta(days=1)).isoformat(), "difficulty": "Medium",
            "status": "SUBMITTED",
            "desc": "Draw 4-bar slider crank position analysis curves and velocity polygons neatly with clear color legends.",
            "ref_file": "slider_crank_rough.png",
            "sub_file": "kinematics_final_vector.pdf",
            "sub_note": "Completed all 5 velocity polygons in high-res vector format with labeled vector endpoints.",
            "sub_at": (now - timedelta(hours=3)).isoformat()
        },

        # COMPLETED Tasks with Reviews and Payments released
        {
            "poster": "Senior #A482", "assigned_to": "Junior #J194",
            "title": "Database Management SQL ER Diagram & Relational Schemas",
            "category": "Diagrams & CAD", "subject": "Database Systems",
            "pages": 8, "rate_per_page": 35.0, "fixed_budget": 0.0, "total_budget": 280.0,
            "deadline": (now - timedelta(days=4)).isoformat(), "difficulty": "Medium",
            "status": "COMPLETED",
            "desc": "Draw Chen notation ER diagram for campus library management system and normalize schema into 3NF tables.",
            "ref_file": "db_specs.docx",
            "sub_file": "library_er_diagram_final.png",
            "sub_note": "Delivered ER diagram with primary/foreign keys properly indicated and normalized relations.",
            "sub_at": (now - timedelta(days=5)).isoformat(),
            "comp_at": (now - timedelta(days=4, hours=2)).isoformat(),
            "senior_review": {"rating": 5, "comment": "Outstanding work! Fast delivery, perfect Chen notation and very polite communication."},
            "junior_review": {"rating": 5, "comment": "Very clear instructions and immediate payment approval. Would gladly work with Senior #A482 again!"}
        },
        {
            "poster": "Senior #A194", "assigned_to": "Junior #J842",
            "title": "Digital Signal Processing Filter Response Curves Plotting",
            "category": "Excel & Data Entry", "subject": "DSP",
            "pages": 10, "rate_per_page": 22.0, "fixed_budget": 0.0, "total_budget": 220.0,
            "deadline": (now - timedelta(days=8)).isoformat(), "difficulty": "Easy",
            "status": "COMPLETED",
            "desc": "Plot Butterworth and Chebyshev bandpass frequency response logs in Excel with dB attenuation curves.",
            "ref_file": "dsp_data.txt",
            "sub_file": "dsp_frequency_plots.xlsx",
            "sub_note": "Plotted both filter attenuation graphs with 3dB cutoff markers.",
            "sub_at": (now - timedelta(days=9)).isoformat(),
            "comp_at": (now - timedelta(days=8)).isoformat(),
            "senior_review": {"rating": 5, "comment": "Completed the task ahead of schedule. Flawless graphs!"},
            "junior_review": {"rating": 5, "comment": "Great senior to work for. Prompt responses."}
        },
        {
            "poster": "Senior #A519", "assigned_to": "Junior #J315",
            "title": "Electrical Machines Transformer Test Data Analysis",
            "category": "Excel & Data Entry", "subject": "Electrical Machines",
            "pages": 6, "rate_per_page": 30.0, "fixed_budget": 0.0, "total_budget": 180.0,
            "deadline": (now - timedelta(days=12)).isoformat(), "difficulty": "Easy",
            "status": "COMPLETED",
            "desc": "Calculate open-circuit and short-circuit equivalent circuit parameters from test sheet.",
            "ref_file": "transformer_test.jpg",
            "sub_file": "transformer_analysis_done.xlsx",
            "sub_note": "Equivalent resistance and reactance values computed and highlighted in yellow.",
            "sub_at": (now - timedelta(days=13)).isoformat(),
            "comp_at": (now - timedelta(days=12)).isoformat(),
            "senior_review": {"rating": 4, "comment": "Good job, minor calculation fix needed but handled quickly."},
            "junior_review": {"rating": 5, "comment": "Clear requirements and fair feedback."}
        }
    ]

    for t in tasks_data:
        poster_id = user_id_map[t["poster"]]
        junior_id = user_id_map.get(t.get("assigned_to")) if t.get("assigned_to") else None
        
        cursor.execute("""
            INSERT INTO tasks (
                poster_id, assigned_junior_id, title, category, subject, pages, rate_per_page,
                fixed_budget, total_budget, deadline, difficulty, description, status,
                reference_file, submission_file, submission_note, submitted_at, completed_at,
                academic_integrity_confirmed, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
        """, (
            poster_id, junior_id, t["title"], t["category"], t["subject"],
            t.get("pages", 0), t.get("rate_per_page", 0.0), t.get("fixed_budget", 0.0),
            t["total_budget"], t["deadline"], t.get("difficulty", "Medium"),
            t["desc"], t["status"], t.get("ref_file"), t.get("sub_file"),
            t.get("sub_note"), t.get("sub_at"), t.get("comp_at"),
            (now - timedelta(days=3)).isoformat()
        ))
        task_id = cursor.lastrowid

        # If completed, seed reviews and payment transaction
        if t["status"] == "COMPLETED" and junior_id:
            # Payment transaction
            cursor.execute("""
                INSERT INTO transactions (task_id, payer_id, receiver_id, amount, type, description, status, timestamp)
                VALUES (?, ?, ?, ?, 'escrow_release', ?, 'completed', ?)
            """, (task_id, poster_id, junior_id, t["total_budget"], f"Payment for '{t['title']}'", t.get("comp_at")))

            # Senior review
            if t.get("senior_review"):
                cursor.execute("""
                    INSERT INTO reviews (task_id, reviewer_id, reviewed_user_id, rating, comment, created_at)
                    VALUES (?, ?, ?, ?, ?, ?)
                """, (task_id, poster_id, junior_id, t["senior_review"]["rating"], t["senior_review"]["comment"], t.get("comp_at")))

            # Junior review
            if t.get("junior_review"):
                cursor.execute("""
                    INSERT INTO reviews (task_id, reviewer_id, reviewed_user_id, rating, comment, created_at)
                    VALUES (?, ?, ?, ?, ?, ?)
                """, (task_id, junior_id, poster_id, t["junior_review"]["rating"], t["junior_review"]["comment"], t.get("comp_at")))

        # If assigned/in progress, seed conversation messages
        if t["status"] in ["IN_PROGRESS", "SUBMITTED", "COMPLETED"] and junior_id:
            chat_seed = [
                (poster_id, junior_id, f"Hi! Thanks for taking up '{t['title']}'. Please refer to the attached reference file."),
                (junior_id, poster_id, "Hello! I have reviewed the requirements. I will follow standard IEEE formatting and complete it before the deadline."),
                (poster_id, junior_id, "Sounds great! Let me know if any formula or diagram needs clarification.")
            ]
            for s_id, r_id, msg in chat_seed:
                cursor.execute("""
                    INSERT INTO messages (task_id, sender_id, receiver_id, message, is_read, timestamp)
                    VALUES (?, ?, ?, ?, 1, ?)
                """, (task_id, s_id, r_id, msg, (now - timedelta(days=1, hours=2)).isoformat()))

    # 4. Seed Applications for some open tasks
    # Applications for Task 1 (Mathematics Assignment)
    t1 = cursor.execute("SELECT id FROM tasks WHERE title LIKE '%Mathematics Assignment%' LIMIT 1").fetchone()
    if t1:
        t1_id = t1[0]
        cursor.execute("""
            INSERT INTO applications (task_id, applicant_id, proposed_price, estimated_time, message, status, created_at)
            VALUES (?, ?, 380.0, 'Tomorrow 6 PM', 'I have top grades in Engineering Mathematics and fast typing in LaTeX/Word. Can finish 20 pages cleanly by tomorrow.', 'pending', ?)
        """, (t1_id, user_id_map["Junior #J194"], (now - timedelta(hours=4)).isoformat()))

        cursor.execute("""
            INSERT INTO applications (task_id, applicant_id, proposed_price, estimated_time, message, status, created_at)
            VALUES (?, ?, 400.0, '24 hours', 'I have done similar assignment formatting for senior batches last semester. 100% accurate equations.', 'pending', ?)
        """, (t1_id, user_id_map["Junior #J315"], (now - timedelta(hours=2)).isoformat()))

    # 5. Seed Welcome Notifications for Users
    for anon, u_id in user_id_map.items():
        cursor.execute("""
            INSERT INTO notifications (user_id, title, message, type, read, timestamp)
            VALUES (?, 'Campus Verification Active', 'Your institutional student identity is verified. Your anonymous handle is ' || ?, 'system', 0, ?)
        """, (u_id, anon, (now - timedelta(days=1)).isoformat()))

    conn.commit()
    conn.close()
    print("Demo dataset seeded successfully!")

if __name__ == "__main__":
    seed_database()
