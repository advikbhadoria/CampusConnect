/**
 * ==============================================================================
 * CAMPUS SHOPS - 8 SHOPS CONTROLLER
 * Evaluates real-time open/closed status, handles online ordering with pre-payment
 * and generates digital pickup tokens for Food Court & OAC.
 * ==============================================================================
 */

let activeFilter = "all"; // "all", "open", "closed"
let searchQuery = "";

// Ordering State
let currentOrderShop = null;
let orderCart = {}; // { [itemId]: quantity }
let lastPlacedOrder = null;

document.addEventListener("DOMContentLoaded", () => {
  updateLiveClock();
  setInterval(updateLiveClock, 1000); // Ticking clock
  renderShops();
  setupToolbarListeners();
});

/**
 * Updates the live clock in header
 */
function updateLiveClock() {
  const clockEl = document.getElementById("liveClockTime");
  if (!clockEl) return;
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  clockEl.textContent = timeStr;
}

/**
 * Evaluates whether a shop is currently open or closed
 */
function isShopCurrentlyOpen(shop) {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  if (!shop.slots || shop.slots.length === 0) return false;

  for (const slot of shop.slots) {
    const startMinutes = slot.start[0] * 60 + slot.start[1];
    const endMinutes = slot.end[0] * 60 + slot.end[1];

    if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
      return true;
    }
  }
  return false;
}

/**
 * Renders the 8 shop cards
 */
function renderShops() {
  const container = document.getElementById("shopsContainer");
  const countDisplay = document.getElementById("shopsCountDisplay");
  if (!container) return;

  // Filter shops
  const filtered = CAMPUS_SHOPS.filter(shop => {
    const isOpen = isShopCurrentlyOpen(shop);
    
    // Status filter
    if (activeFilter === "open" && !isOpen) return false;
    if (activeFilter === "closed" && isOpen) return false;

    // Search query filter
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matchName = shop.name.toLowerCase().includes(q);
      const matchOwner = shop.ownerName.toLowerCase().includes(q);
      const matchPhone = shop.phoneNumber.toLowerCase().includes(q);
      if (!matchName && !matchOwner && !matchPhone) return false;
    }

    return true;
  });

  // Update summary count
  if (countDisplay) {
    const openCount = CAMPUS_SHOPS.filter(s => isShopCurrentlyOpen(s)).length;
    countDisplay.textContent = `${openCount} of ${CAMPUS_SHOPS.length} shops currently open`;
  }

  const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (allBtn) {
    allBtn.textContent = `All Shops (${CAMPUS_SHOPS.length})`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: rgba(255,255,255,0.7); border-radius: 16px; border: 1px dashed #93c5fd;">
        <i class="fa-solid fa-store-slash" style="font-size: 2.4rem; color: #38bdf8; margin-bottom: 12px;"></i>
        <h3 style="font-size: 1.2rem; font-weight: 700; color: #0f172a; margin-bottom: 6px;">No Shops Match Filter</h3>
        <p style="color: #64748b; font-size: 0.9rem;">Try selecting 'All' or clearing your search term.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(shop => {
    const isOpen = isShopCurrentlyOpen(shop);
    const cleanPhone = shop.phoneNumber.replace(/[^0-9]/g, '');

    const onlineOrderButton = shop.onlineOrdering ? `
      <button class="btn-order-online ${shop.id === 'shop-oac' ? 'oac-theme' : ''}" onclick="openOrderMenu('${shop.id}')">
        <i class="fa-solid fa-burger"></i>
        <span>Order Online (Pickup)</span>
      </button>
    ` : '';

    return `
      <article class="shop-card">
        <!-- Status indicator (green or red dot followed by Open or Close) IN FRONT of shop name -->
        <div class="shop-header-row">
          <span class="status-pill ${isOpen ? 'status-open' : 'status-closed'}">
            <span class="dot"></span>
            ${isOpen ? 'Open' : 'Close'}
          </span>
          <h2 class="shop-name-title">${escapeHtml(shop.name)}</h2>
          ${shop.onlineOrdering ? '<span class="online-order-badge"><i class="fa-solid fa-bolt"></i> Online Order</span>' : ''}
        </div>

        <!-- Shop Details -->
        <div class="shop-details-list">
          <div class="detail-row">
            <i class="fa-solid fa-user-tie"></i>
            <span class="detail-label">Owner Name:</span>
            <span class="detail-value">${escapeHtml(shop.ownerName)}</span>
          </div>

          <div class="detail-row">
            <i class="fa-solid fa-phone"></i>
            <span class="detail-label">Phone Number:</span>
            <span class="detail-value">
              <a href="tel:${escapeHtml(shop.phoneNumber)}">${escapeHtml(shop.phoneNumber)}</a>
            </span>
          </div>

          <div class="detail-row">
            <i class="fa-solid fa-clock"></i>
            <span class="detail-label">Timings:</span>
            <span class="detail-value">${escapeHtml(shop.generalHours)}</span>
          </div>

          <div class="detail-row">
            <i class="fa-solid fa-hourglass-half"></i>
            <span class="detail-label">Closing Time:</span>
            <span class="detail-value">
              <span class="closing-badge">${escapeHtml(shop.approxClosing)}</span>
            </span>
          </div>
        </div>

        <!-- Quick Call & WhatsApp Action Buttons -->
        <div class="shop-card-actions">
          <a href="tel:${escapeHtml(shop.phoneNumber)}" class="btn-contact btn-call">
            <i class="fa-solid fa-phone"></i> Call Owner
          </a>
          <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello ' + shop.ownerName + ', I am contacting you regarding ' + shop.name + ' on campus.')}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn-contact btn-wa">
            <i class="fa-brands fa-whatsapp"></i> WhatsApp
          </a>
        </div>

        ${onlineOrderButton}
      </article>
    `;
  }).join("");
}

/**
 * ==============================================================================
 * ONLINE ORDERING FLOW (Food Court & OAC)
 * ==============================================================================
 */

function openOrderMenu(shopId) {
  const shop = CAMPUS_SHOPS.find(s => s.id === shopId);
  if (!shop || !shop.onlineOrdering) return;

  currentOrderShop = shop;
  orderCart = {}; // Reset cart for fresh order

  const modal = document.getElementById("orderMenuModal");
  const title = document.getElementById("menuModalShopTitle");
  const subtitle = document.getElementById("menuModalShopSubtitle");
  const pickupLoc = document.getElementById("menuModalPickupLoc");
  const header = document.getElementById("menuModalHeader");

  title.textContent = `${shop.name} Menu`;
  subtitle.textContent = `Online Order • Offline Pickup at ${shop.name}`;
  pickupLoc.textContent = `Collect at: ${shop.pickupLocation} (approx 15–20 mins).`;

  if (shop.id === "shop-oac") {
    header.classList.add("oac-header");
  } else {
    header.classList.remove("oac-header");
  }

  renderMenuModalItems();
  updateOrderBillSummary();

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeOrderMenuModal() {
  const modal = document.getElementById("orderMenuModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

function renderMenuModalItems() {
  const container = document.getElementById("menuItemsContainer");
  if (!container || !currentOrderShop) return;

  container.innerHTML = currentOrderShop.menu.map(item => {
    const qty = orderCart[item.id] || 0;
    return `
      <div class="menu-item-row">
        <div class="item-left-details">
          <div class="diet-symbol ${item.type}"></div>
          <div>
            <div class="item-name-heading">${escapeHtml(item.name)}</div>
            <div>
              <span class="item-price-val">₹${item.price}</span>
              ${item.tag ? `<span class="item-tag-chip">${escapeHtml(item.tag)}</span>` : ''}
            </div>
          </div>
        </div>

        <div class="qty-control-box">
          ${qty > 0 ? `
            <button type="button" class="btn-qty" onclick="changeItemQty('${item.id}', -1)">&minus;</button>
            <span class="qty-display">${qty}</span>
            <button type="button" class="btn-qty" onclick="changeItemQty('${item.id}', 1)">&plus;</button>
          ` : `
            <button type="button" class="btn-qty" style="width: auto; padding: 6px 14px; font-size: 0.82rem;" onclick="changeItemQty('${item.id}', 1)">
              &plus; Add
            </button>
          `}
        </div>
      </div>
    `;
  }).join("");
}

function changeItemQty(itemId, delta) {
  const current = orderCart[itemId] || 0;
  const newQty = Math.max(0, current + delta);
  if (newQty === 0) {
    delete orderCart[itemId];
  } else {
    orderCart[itemId] = newQty;
  }

  renderMenuModalItems();
  updateOrderBillSummary();
}

function updateOrderBillSummary() {
  const countEl = document.getElementById("orderCartCount");
  const totalEl = document.getElementById("orderCartTotal");
  const btnProceed = document.getElementById("btnProceedToPay");
  if (!currentOrderShop) return;

  let totalItems = 0;
  let totalPrice = 0;

  for (const [itemId, qty] of Object.entries(orderCart)) {
    const item = currentOrderShop.menu.find(m => m.id === itemId);
    if (item && qty > 0) {
      totalItems += qty;
      totalPrice += item.price * qty;
    }
  }

  if (countEl) countEl.textContent = `${totalItems} item${totalItems === 1 ? '' : 's'} selected`;
  if (totalEl) totalEl.textContent = `₹${totalPrice}`;
  if (btnProceed) btnProceed.disabled = totalItems === 0;
}

/**
 * ==============================================================================
 * PAYMENT & PRE-ORDER CONFIRMATION (Bill & Verification)
 * ==============================================================================
 */

function proceedToPayment() {
  if (!currentOrderShop) return;
  const totalItems = Object.values(orderCart).reduce((a, b) => a + b, 0);
  if (totalItems === 0) return;

  closeOrderMenuModal();

  const paymentModal = document.getElementById("orderPaymentModal");
  const itemsListEl = document.getElementById("paymentOrderItemsList");
  const totalAmountEl = document.getElementById("paymentTotalAmount");
  const upiIdEl = document.getElementById("paymentUpiIdText");
  const header = document.getElementById("paymentModalHeader");

  if (currentOrderShop.id === "shop-oac") {
    header.classList.add("oac-header");
  } else {
    header.classList.remove("oac-header");
  }

  let totalPrice = 0;
  let itemsHtml = "";

  for (const [itemId, qty] of Object.entries(orderCart)) {
    const item = currentOrderShop.menu.find(m => m.id === itemId);
    if (item && qty > 0) {
      const lineTotal = item.price * qty;
      totalPrice += lineTotal;
      itemsHtml += `
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span>${escapeHtml(item.name)} <strong>&times; ${qty}</strong></span>
          <span>₹${lineTotal}</span>
        </div>
      `;
    }
  }

  itemsListEl.innerHTML = itemsHtml;
  totalAmountEl.textContent = `₹${totalPrice}`;
  upiIdEl.textContent = currentOrderShop.upiId;

  // Set up dynamically generated completely visible UPI QR Code
  const qrImg = document.getElementById("paymentQrImg");
  const qrFallback = document.getElementById("paymentQrFallback");
  const upiUri = `upi://pay?pa=${currentOrderShop.upiId}&pn=${encodeURIComponent(currentOrderShop.name)}&am=${totalPrice}&cu=INR`;
  
  if (qrImg) {
    qrImg.style.display = "block";
    if (qrFallback) qrFallback.style.display = "none";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=4&data=${encodeURIComponent(upiUri)}`;
    qrImg.onerror = () => {
      qrImg.style.display = "none";
      if (qrFallback) qrFallback.style.display = "block";
    };
  }

  // Reset form inputs
  document.getElementById("custNameInput").value = "";
  document.getElementById("custPhoneInput").value = "";
  document.getElementById("upiRefInput").value = "";

  paymentModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closePaymentModal() {
  const modal = document.getElementById("orderPaymentModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

function backToMenuModal() {
  closePaymentModal();
  if (currentOrderShop) {
    const menuModal = document.getElementById("orderMenuModal");
    menuModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function copyUpiId() {
  const text = document.getElementById("paymentUpiIdText")?.textContent;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    alert(`UPI ID "${text}" copied to clipboard! Paste it into your UPI app to pay.`);
  }).catch(() => {
    prompt("Copy UPI ID:", text);
  });
}

function handlePaymentSubmit(event) {
  event.preventDefault();

  const custName = document.getElementById("custNameInput").value.trim();
  const custPhone = document.getElementById("custPhoneInput").value.trim();
  const upiRef = document.getElementById("upiRefInput").value.trim();

  if (!custName || !custPhone || !upiRef) {
    alert("Please fill in your name, phone number, and UPI transaction reference number.");
    return;
  }

  // Calculate bill total
  let totalPrice = 0;
  const itemSummaries = [];

  for (const [itemId, qty] of Object.entries(orderCart)) {
    const item = currentOrderShop.menu.find(m => m.id === itemId);
    if (item && qty > 0) {
      totalPrice += item.price * qty;
      itemSummaries.push(`${item.name} x${qty} (₹${item.price * qty})`);
    }
  }

  // Generate Unique Token
  const prefix = currentOrderShop.id === "shop-oac" ? "OAC" : "FC";
  const tokenNum = Math.floor(100 + Math.random() * 900);
  const digitalToken = `${prefix}-${tokenNum}`;

  lastPlacedOrder = {
    token: digitalToken,
    shopName: currentOrderShop.name,
    pickupLocation: currentOrderShop.pickupLocation,
    customerName: custName,
    customerPhone: custPhone,
    upiRef: upiRef,
    totalPrice: totalPrice,
    items: itemSummaries,
    placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  closePaymentModal();
  showOrderTokenModal(lastPlacedOrder);
}

/**
 * ==============================================================================
 * DIGITAL PICKUP TOKEN DISPLAY
 * ==============================================================================
 */

function showOrderTokenModal(order) {
  const modal = document.getElementById("orderTokenModal");
  const tokenDisplay = document.getElementById("tokenDisplayNumber");
  const pickupCounter = document.getElementById("tokenPickupCounter");
  const custNameDisplay = document.getElementById("tokenCustomerName");
  const summaryList = document.getElementById("tokenSummaryItems");
  const waShareBtn = document.getElementById("tokenWhatsAppShareBtn");

  tokenDisplay.textContent = order.token;
  pickupCounter.textContent = `${order.shopName} - ${order.pickupLocation}`;
  custNameDisplay.textContent = `Customer: ${order.customerName} (${order.customerPhone}) • Paid ₹${order.totalPrice}`;

  summaryList.innerHTML = order.items.map(item => `
    <div>• ${escapeHtml(item)}</div>
  `).join("") + `
    <div style="margin-top: 6px; font-weight: 700; color: #0284c7;">UPI Ref: ${escapeHtml(order.upiRef)} • Verified</div>
  `;

  // WhatsApp self-record / store copy
  const waMessage = encodeURIComponent(
    `*CAMPUS CONNECT PREPAID ORDER TOKEN*\n` +
    `Token: *${order.token}*\n` +
    `Shop: ${order.shopName}\n` +
    `Pickup Location: ${order.pickupLocation}\n` +
    `Customer: ${order.customerName}\n` +
    `Items:\n` + order.items.map(i => ` - ${i}`).join("\n") + `\n` +
    `Total Paid: ₹${order.totalPrice} (UPI UTR: ${order.upiRef})\n` +
    `Status: PREPARING (Self-Pickup in 15-20 mins)`
  );

  waShareBtn.href = `https://wa.me/?text=${waMessage}`;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeTokenModal() {
  const modal = document.getElementById("orderTokenModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

/**
 * Setup Search & Filter Toolbar Listeners
 */
function setupToolbarListeners() {
  const searchInput = document.getElementById("shopSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderShops();
    });
  }

  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.getAttribute("data-filter");
      renderShops();
    });
  });
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
