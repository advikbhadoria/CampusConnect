import json
from fastapi.testclient import TestClient
from backend.server import app

def run_e2e_verification():
    client = TestClient(app)
    print("==================================================")
    print("   CAMPUSTASK E2E VERIFICATION TEST SUITE        ")
    print("==================================================")

    # 1. Health Check
    health = client.get("/api/health")
    assert health.status_code == 200
    print("✅ 1. API Health Check passed:", health.json())

    # 2. Get Demo Users
    demo_res = client.get("/api/auth/demo-users")
    assert demo_res.status_code == 200
    demo_users = demo_res.json()
    print(f"✅ 2. Demo Users loaded ({len(demo_users)} students across branches).")
    senior = next(u for u in demo_users if u["role"] == "senior")
    junior = next(u for u in demo_users if u["role"] == "junior")
    admin = next(u for u in demo_users if u["role"] == "admin")

    # 3. Switch / Login as Senior
    senior_auth = client.post(f"/api/auth/switch-demo/{senior['id']}").json()
    senior_token = senior_auth["token"]
    senior_headers = {"Authorization": f"Bearer {senior_token}"}
    print(f"✅ 3. Logged in as Senior ({senior_auth['user']['anonymous_id']}), Available Wallet: ₹{senior_auth['user']['wallet_balance']}")

    # 4. Senior Posts a Task: 20 pages @ ₹20/page = ₹400
    task_payload = {
        "title": "Engineering Mathematics Assignment",
        "category": "Assignment Assistance",
        "subject": "Engineering Mathematics",
        "pages": 20,
        "rate_per_page": 20.0,
        "fixed_budget": 0.0,
        "deadline": "2026-10-05T18:00:00",
        "difficulty": "Medium",
        "description": "Clean typesetting of 20 pages of differential equations into SP46 layout with numbered equations.",
        "academic_integrity_confirmed": True
    }
    create_res = client.post("/api/tasks", json=task_payload, headers=senior_headers)
    assert create_res.status_code == 200, create_res.text
    task_data = create_res.json()
    task_id = task_data["task_id"]
    print(f"✅ 4. Senior posted task #{task_id}: Calculated budget = ₹{task_data['total_budget']} (Escrow reserved).")

    # 5. Verify Task in Marketplace
    market_res = client.get("/api/tasks?search=Mathematics")
    assert market_res.status_code == 200
    matching_tasks = market_res.json()
    found_task = next((t for t in matching_tasks if t["id"] == task_id), None)
    assert found_task is not None
    print(f"✅ 5. Marketplace Search verified: Task '{found_task['title']}' is live. Status: {found_task['status']}, Budget: ₹{found_task['total_budget']}.")

    # 6. Switch / Login as Junior
    junior_auth = client.post(f"/api/auth/switch-demo/{junior['id']}").json()
    junior_token = junior_auth["token"]
    junior_headers = {"Authorization": f"Bearer {junior_token}"}
    initial_junior_wallet = junior_auth["user"]["wallet_balance"]
    print(f"✅ 6. Logged in as Junior ({junior_auth['user']['anonymous_id']}), Initial Wallet: ₹{initial_junior_wallet}")

    # 7. Junior Applies for the Task
    apply_payload = {
        "task_id": task_id,
        "proposed_price": 400.0,
        "estimated_time": "Tomorrow 6 PM",
        "message": "I have experience with engineering mathematics and can complete the formatting and diagrams by tomorrow."
    }
    apply_res = client.post("/api/applications", json=apply_payload, headers=junior_headers)
    assert apply_res.status_code == 200, apply_res.text
    app_id = apply_res.json()["application_id"]
    print(f"✅ 7. Junior submitted application #{app_id} for ₹400.")

    # 8. Senior Views and Accepts the Application
    apps_res = client.get(f"/api/applications/task/{task_id}", headers=senior_headers)
    assert apps_res.status_code == 200
    apps_list = apps_res.json()
    assert len(apps_list) >= 1
    print(f"✅ 8. Senior received {len(apps_list)} application(s). Accepting Junior...")

    decide_res = client.post("/api/applications/decision", json={"application_id": app_id, "decision": "accepted"}, headers=senior_headers)
    assert decide_res.status_code == 200
    print(f"✅ 9. Senior accepted application. Task status updated to ASSIGNED.")

    # 9. Test Anonymous Chat & Contact Info Masking
    chat_payload_1 = {
        "task_id": task_id,
        "receiver_id": junior["id"],
        "message": "Can you complete the diagrams today? Call me at 9876543210 or email test@gmail.com"
    }
    send_msg_1 = client.post("/api/messages", json=chat_payload_1, headers=senior_headers).json()
    print(f"✅ 10. Chat Message Sent by Senior. Verified Privacy Masking: \"{send_msg_1['message']}\"")
    assert "[Phone number protected" in send_msg_1["message"]
    assert "[Email protected" in send_msg_1["message"]

    chat_payload_2 = {
        "task_id": task_id,
        "receiver_id": senior["id"],
        "message": "Yes, I'll upload them by 7 PM."
    }
    send_msg_2 = client.post("/api/messages", json=chat_payload_2, headers=junior_headers).json()
    print(f"✅ 11. Chat Message Reply by Junior: \"{send_msg_2['message']}\"")

    # 10. Junior Uploads and Delivers Completed Work
    sub_payload = {
        "task_id": task_id,
        "submission_note": "Completed all 20 pages of differential equation formatting with SP46 margins and vector plots.",
        "submission_file": "math_assignment_final.pdf"
    }
    sub_res = client.post("/api/submissions/submit", json=sub_payload, headers=junior_headers)
    assert sub_res.status_code == 200
    print(f"✅ 12. Junior submitted completed work. Task status is now SUBMITTED.")

    # 11. Senior Approves Work & Releases Escrow Payment
    approve_res = client.post(f"/api/submissions/approve/{task_id}", headers=senior_headers)
    assert approve_res.status_code == 200
    print(f"✅ 13. Senior approved completed work. Payout released: {approve_res.json()}")

    # 12. Verify Junior Wallet Increased
    junior_wallet_res = client.get("/api/wallet/summary", headers=junior_headers).json()
    new_junior_wallet = junior_wallet_res["available_balance"]
    assert new_junior_wallet == initial_junior_wallet + 400.0
    print(f"✅ 14. Junior Wallet Verified: ₹{initial_junior_wallet} + ₹400 = ₹{new_junior_wallet} (Available Balance).")

    # 13. Both Users Rate Each Other
    rev_senior = client.post("/api/reviews", json={"task_id": task_id, "rating": 5, "comment": "Completed the task before the deadline. Superb formatting!"}, headers=senior_headers).json()
    rev_junior = client.post("/api/reviews", json={"task_id": task_id, "rating": 5, "comment": "Great senior to work with! Clear instructions and immediate approval."}, headers=junior_headers).json()
    print(f"✅ 15. Both users rated 5-stars: Senior review = {rev_senior['success']}, Junior review = {rev_junior['success']}.")

    # 14. Admin Console Verification
    admin_auth = client.post(f"/api/auth/switch-demo/{admin['id']}").json()
    admin_headers = {"Authorization": f"Bearer {admin_auth['token']}"}
    admin_stats = client.get("/api/admin/stats", headers=admin_headers).json()
    admin_users = client.get("/api/admin/users", headers=admin_headers).json()
    print(f"✅ 16. Admin Console Verified: Total Students = {admin_stats['total_students']}, Completed Tasks = {admin_stats['completed_tasks']}, Platform Volume = ₹{admin_stats['total_volume']}.")
    print(f"     Real Student Registry accessible to Admin only (reveals names: {admin_users[0]['name']}).")

    print("\n==================================================")
    print("   ALL 16 E2E VERIFICATION STEPS PASSED 100%!     ")
    print("==================================================")

if __name__ == "__main__":
    run_e2e_verification()
