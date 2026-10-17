from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends
from backend.database import get_db_connection
from backend.auth import get_current_user
from backend.schemas import WalletAction
from backend.notifications import create_notification

router = APIRouter(prefix="/api/wallet", tags=["wallet"])

@router.get("/summary")
def get_wallet_summary(current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE id = ?", (current_user["id"],)).fetchone()
    
    # Calculate total earned (for juniors) or total spent (for seniors)
    total_earned = conn.execute("""
        SELECT COALESCE(SUM(amount), 0.0) as total FROM transactions
        WHERE receiver_id = ? AND type = 'escrow_release' AND status = 'completed'
    """, (current_user["id"],)).fetchone()["total"]

    total_spent = conn.execute("""
        SELECT COALESCE(SUM(amount), 0.0) as total FROM transactions
        WHERE payer_id = ? AND type = 'escrow_release' AND status = 'completed'
    """, (current_user["id"],)).fetchone()["total"]

    # Active escrow locked
    escrow_locked = user["pending_balance"]

    conn.close()

    return {
        "user_id": user["id"],
        "anonymous_id": user["anonymous_id"],
        "role": user["role"],
        "available_balance": user["wallet_balance"],
        "pending_balance": user["pending_balance"],
        "total_earned": total_earned,
        "total_spent": total_spent,
        "escrow_locked": escrow_locked,
        "is_prototype": True
    }

@router.get("/transactions")
def get_transactions(current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    txs = conn.execute("""
        SELECT tx.*, t.title as task_title,
               p.anonymous_id as payer_anon_id,
               r.anonymous_id as receiver_anon_id
        FROM transactions tx
        LEFT JOIN tasks t ON tx.task_id = t.id
        LEFT JOIN users p ON tx.payer_id = p.id
        LEFT JOIN users r ON tx.receiver_id = r.id
        WHERE tx.payer_id = ? OR tx.receiver_id = ?
        ORDER BY tx.id DESC
        LIMIT 50
    """, (current_user["id"], current_user["id"])).fetchall()
    conn.close()

    results = []
    for row in txs:
        item = dict(row)
        # Determine if credit or debit relative to current user
        if item["receiver_id"] == current_user["id"] and item["type"] in ["escrow_release", "deposit", "refund"]:
            item["direction"] = "credit"
        elif item["payer_id"] == current_user["id"] and item["type"] in ["escrow_lock", "withdrawal"]:
            item["direction"] = "debit"
        else:
            item["direction"] = "neutral"
        results.append(item)

    return results

@router.post("/action")
def wallet_action(data: WalletAction, current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    user = conn.execute("SELECT wallet_balance FROM users WHERE id = ?", (current_user["id"],)).fetchone()
    now = datetime.now().isoformat()

    if data.action == "deposit":
        new_balance = user["wallet_balance"] + data.amount
        conn.execute("UPDATE users SET wallet_balance = ? WHERE id = ?", (new_balance, current_user["id"]))
        conn.execute("""
            INSERT INTO transactions (receiver_id, amount, type, description, status, timestamp)
            VALUES (?, ?, 'deposit', ?, 'completed', ?)
        """, (current_user["id"], data.amount, f"Simulated wallet top-up ({data.note or 'Campus bank test transfer'})", now))
        conn.commit()
        conn.close()

        create_notification(
            current_user["id"],
            "Wallet Deposit Successful",
            f"₹{data.amount:.0f} was added to your available balance.",
            "payment"
        )
        return {"success": True, "new_balance": new_balance, "message": f"Deposited ₹{data.amount:.0f} successfully."}

    elif data.action == "withdraw":
        if user["wallet_balance"] < data.amount:
            conn.close()
            raise HTTPException(status_code=400, detail="Insufficient available balance to withdraw.")

        new_balance = user["wallet_balance"] - data.amount
        conn.execute("UPDATE users SET wallet_balance = ? WHERE id = ?", (new_balance, current_user["id"]))
        conn.execute("""
            INSERT INTO transactions (payer_id, amount, type, description, status, timestamp)
            VALUES (?, ?, 'withdrawal', ?, 'completed', ?)
        """, (current_user["id"], data.amount, f"Simulated withdrawal payout ({data.note or 'UPI / Bank Transfer test'})", now))
        conn.commit()
        conn.close()

        create_notification(
            current_user["id"],
            "Withdrawal Processed",
            f"₹{data.amount:.0f} has been withdrawn to your linked student account.",
            "payment"
        )
        return {"success": True, "new_balance": new_balance, "message": f"Withdrew ₹{data.amount:.0f} successfully."}

    else:
        conn.close()
        raise HTTPException(status_code=400, detail="Invalid wallet action. Choose 'deposit' or 'withdraw'.")
