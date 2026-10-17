/**
 * Student Wallet & Escrow Ledger View
 */
const WalletView = {
  async render() {
    return `
      <div class="wallet-page" style="padding: 24px 0; max-width: 960px; margin: 0 auto;">
        <!-- Header -->
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 28px;">
          <div>
            <h1 style="font-size: 1.85rem; margin-bottom: 4px;">Student Wallet</h1>
            <p style="color: var(--text-secondary); font-size: 0.92rem;">
              Track available balances, active escrow holds, and past settlements.
            </p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary" onclick="WalletView.openDepositModal()">
              <span>+ Add Funds</span>
            </button>
            <button class="btn btn-primary" onclick="WalletView.openWithdrawModal()">
              <span>Withdraw to UPI</span>
            </button>
          </div>
        </div>

        <!-- Balances Summary Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; margin-bottom: 32px;" id="wallet-cards-grid">
          <!-- Available Balance -->
          <div class="card" style="background: linear-gradient(135deg, rgba(5, 150, 105, 0.08), rgba(124, 58, 237, 0.04)); border: 1px solid rgba(5, 150, 105, 0.25);">
            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Available Balance</div>
            <div id="wallet-avail-bal" style="font-size: 2.2rem; font-weight: 800; color: var(--success); margin: 6px 0;">₹0</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">Ready for task posting or withdrawal</div>
          </div>

          <!-- Pending in Escrow -->
          <div class="card" style="background: linear-gradient(135deg, rgba(217, 119, 6, 0.08), rgba(124, 58, 237, 0.04)); border: 1px solid rgba(217, 119, 6, 0.25);">
            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Pending in Escrow</div>
            <div id="wallet-pending-bal" style="font-size: 2.2rem; font-weight: 800; color: var(--warning); margin: 6px 0;">₹0</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">Locked in active/submitted tasks</div>
          </div>

          <!-- Total Cumulative Earnings / Spend -->
          <div class="card">
            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;" id="wallet-total-label">Total Platform Volume</div>
            <div id="wallet-volume-bal" style="font-size: 2.2rem; font-weight: 800; color: var(--accent-coral); margin: 6px 0;">₹0</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">Lifetime settled transactions</div>
          </div>
        </div>

        <!-- Transactions Ledger Table -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
            <h3 style="font-size: 1.25rem;">Transaction Ledger</h3>
            <span style="font-size: 0.82rem; color: var(--text-muted);">Showing recent 50 transactions</span>
          </div>

          <div id="wallet-tx-table-container" style="overflow-x: auto;">
            <div style="text-align: center; padding: 30px; color: var(--text-muted);">Loading transactions...</div>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    await this.loadWalletData();
  },

  async loadWalletData() {
    try {
      const summary = await API.getWalletSummary();
      const txs = await API.getTransactions();

      document.getElementById('wallet-avail-bal').textContent = `₹${Math.round(summary.available_balance || 0)}`;
      document.getElementById('wallet-pending-bal').textContent = `₹${Math.round(summary.pending_balance || 0)}`;

      if (summary.role === 'junior') {
        document.getElementById('wallet-total-label').textContent = 'Total Earned';
        document.getElementById('wallet-volume-bal').textContent = `₹${Math.round(summary.total_earned || 0)}`;
      } else {
        document.getElementById('wallet-total-label').textContent = 'Total Spent';
        document.getElementById('wallet-volume-bal').textContent = `₹${Math.round(summary.total_spent || 0)}`;
      }

      const tableContainer = document.getElementById('wallet-tx-table-container');
      if (txs.length === 0) {
        tableContainer.innerHTML = `
          <div style="text-align: center; padding: 30px; color: var(--text-muted);">
            No transactions recorded yet.
          </div>
        `;
        return;
      }

      tableContainer.innerHTML = `
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-subtle); color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">
              <th style="padding: 12px 14px;">Type</th>
              <th style="padding: 12px 14px;">Description</th>
              <th style="padding: 12px 14px;">Amount</th>
              <th style="padding: 12px 14px;">Status</th>
              <th style="padding: 12px 14px;">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            ${txs.map(tx => {
              const isCredit = tx.direction === 'credit';
              const isDebit = tx.direction === 'debit';
              const sign = isCredit ? '+' : isDebit ? '-' : '';
              const color = isCredit ? 'var(--success)' : isDebit ? 'var(--danger)' : 'var(--text-primary)';
              const timeStr = new Date(tx.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });

              return `
                <tr style="border-bottom: 1px solid var(--border-subtle);">
                  <td style="padding: 12px 14px; font-weight: 600;">
                    <span class="badge ${isCredit ? 'badge-verified' : isDebit ? 'badge-urgent' : 'badge-match'}">
                      ${tx.type.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td style="padding: 12px 14px; color: var(--text-primary);">
                    ${tx.description}
                    ${tx.task_title ? `<div style="font-size: 0.78rem; color: var(--text-muted);">Task: ${tx.task_title}</div>` : ''}
                  </td>
                  <td style="padding: 12px 14px; font-weight: 800; color: ${color};">
                    ${sign}₹${Math.round(tx.amount)}
                  </td>
                  <td style="padding: 12px 14px;">
                    <span style="color: var(--success); font-weight: 600; font-size: 0.8rem;">● ${tx.status}</span>
                  </td>
                  <td style="padding: 12px 14px; color: var(--text-muted); font-size: 0.82rem;">
                    ${timeStr}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      `;
    } catch (err) {
      console.error(err);
    }
  },

  openDepositModal() {
    App.openModal(`
      <div class="modal-header">
        <h3 style="font-size: 1.25rem;">Simulated Wallet Deposit</h3>
        <button class="modal-close" onclick="App.closeModal()">&times;</button>
      </div>
      <form onsubmit="WalletView.handleDeposit(event)">
        <div class="form-group">
          <label class="form-label">Deposit Amount (₹)</label>
          <input type="number" id="deposit-amount" class="form-input" value="500" min="50" step="50" required />
        </div>
        <div class="form-group">
          <label class="form-label">Payment Method (Simulated)</label>
          <select class="form-select">
            <option>UPI / Google Pay / PhonePe (Test)</option>
            <option>Campus Debit Card (Test)</option>
            <option>Net Banking (Test)</option>
          </select>
        </div>
        <button type="submit" class="btn btn-success" style="width: 100%; padding: 12px; margin-top: 10px;">
          <span>Deposit ₹ into Student Wallet</span>
        </button>
      </form>
    `);
  },

  async handleDeposit(e) {
    e.preventDefault();
    const amount = document.getElementById('deposit-amount').value;
    try {
      await API.walletAction('deposit', amount, 'Student Top-Up');
      App.closeModal();
      API.showToast(`Deposited ₹${amount} into wallet successfully!`, 'success');
      await this.loadWalletData();
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  },

  openWithdrawModal() {
    App.openModal(`
      <div class="modal-header">
        <h3 style="font-size: 1.25rem;">Withdraw Earnings to UPI / Bank</h3>
        <button class="modal-close" onclick="App.closeModal()">&times;</button>
      </div>
      <form onsubmit="WalletView.handleWithdraw(event)">
        <div class="form-group">
          <label class="form-label">Withdrawal Amount (₹)</label>
          <input type="number" id="withdraw-amount" class="form-input" value="300" min="50" step="50" required />
        </div>
        <div class="form-group">
          <label class="form-label">UPI ID / Student Account Number</label>
          <input type="text" class="form-input" placeholder="e.g. student@okaxis / 9876543210@paytm" required value="student@okaxis" />
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; margin-top: 10px;">
          <span>Request Instant Payout</span>
        </button>
      </form>
    `);
  },

  async handleWithdraw(e) {
    e.preventDefault();
    const amount = document.getElementById('withdraw-amount').value;
    try {
      await API.walletAction('withdraw', amount, 'UPI Payout to Student');
      App.closeModal();
      API.showToast(`Withdrew ₹${amount} successfully to student account!`, 'success');
      await this.loadWalletData();
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  }
};
