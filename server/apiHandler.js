/**
 * ==============================================================================
 * CAMPUS CONNECT UNIFIED API HANDLER
 * ==============================================================================
 * Shared between:
 * 1. Local Server (`server/server.js`)
 * 2. Vercel Serverless Functions (`api/index.js`)
 * ==============================================================================
 */

const url = require('url');

// --- 1. DATA STORES (In-Memory with Pre-Seeded Datasets) ---

let complaints = [
  {
    id: 'AIT-2026-0182',
    category: 'hostel',
    title: 'Block B 3rd Floor geyser dead for 5 days, freezing water before 8 AM PT',
    body: 'The central geyser unit on 3rd floor Block B (OBH) trips the MCB within 30 seconds of turning on. Over 40 cadets and students on this wing are taking ice-cold showers at 6:30 AM before PT parade and morning lectures.',
    severity: 4,
    visibility: 'public',
    hide_identity: false,
    assigned_roles: ['warden', 'chief_warden', 'jd'],
    status: 'in_progress',
    location: 'OBH Block B, 3rd Floor Washroom (Wing A)',
    reporter_id: 'STU-2026-CURRENT',
    reporter_name: 'Snehangshu Das',
    reporter_roll: '22045',
    reporter_branch: 'Computer Science',
    reporter_hostel: 'OBH-1 Room 214',
    upvote_count: 142,
    has_voted: false,
    created_at: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    sla_hours: 48,
    updates: [
      {
        id: 'UPD-1',
        author_role: 'warden',
        author_name: 'Prof. M S Kulkarni (Warden)',
        note: 'Inspected with estate electrician. Replacement heating element requisitioned from Pune market.',
        created_at: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
        is_audit: false
      }
    ]
  },
  {
    id: 'AIT-2026-0179',
    category: 'mess',
    title: 'Shivaji Mess Dinner dal consistently watered down; insect found in Tuesday salad tray',
    body: 'Over the last 10 days, dinner dal has zero lentils and is 90% water. On Tuesday night (14 Oct), second-year students noticed a dead moth in the shredded cabbage salad tray near counter #2.',
    severity: 4,
    visibility: 'public',
    hide_identity: false,
    assigned_roles: ['mess_secretary', 'mess_warden', 'chief_warden'],
    status: 'investigating',
    location: 'Shivaji Mess (Cadet Dining Hall #1)',
    reporter_id: 'STU-2026-0092',
    reporter_name: 'Priya Sharma',
    reporter_roll: '22194',
    reporter_branch: 'Information Technology',
    reporter_hostel: 'GH-1 Room 108',
    upvote_count: 218,
    has_voted: true,
    created_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    sla_hours: 24,
    updates: []
  },
  {
    id: 'AIT-2026-0175',
    category: 'labs',
    title: 'Lab 4 (Ramanujan Block) 6 CRO oscilloscopes missing channel 1 BNC probes',
    body: 'During TE E&TC Signal Processing Lab practicals, students in Batch B2 spent 45 minutes searching for working BNC probes. Workstations #7 through #12 have bent ground clips.',
    severity: 3,
    visibility: 'public',
    hide_identity: false,
    assigned_roles: ['lab_superintendent', 'hod_etc'],
    status: 'resolved',
    location: 'Ramanujan Academic Complex, 2nd Floor, DSP Lab 4',
    reporter_id: 'STU-2026-0104',
    reporter_name: 'Arjun Mehta',
    reporter_roll: '22088',
    reporter_branch: 'Electronics & Comm.',
    reporter_hostel: 'OBH-2 Room 312',
    upvote_count: 67,
    has_voted: false,
    created_at: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
    resolved_at: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
    sla_hours: 72,
    updates: [
      {
        id: 'UPD-2',
        author_role: 'lab_superintendent',
        author_name: 'Mr. S R Patil (Lab Superintendent)',
        note: 'Procured 12 brand new 100MHz BNC probes and calibrated all 6 Rigol oscilloscopes.',
        created_at: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
        is_audit: false
      }
    ]
  }
];

const AUTHORITIES = {
  director: { title: 'Director', name: 'Brig. Abhay Bhat (Retd)', email: 'director@aitpune.edu.in' },
  jd: { title: 'Joint Director', name: 'Col. K P Singh', email: 'jd@aitpune.edu.in' },
  chief_warden: { title: 'Chief Warden', name: 'Col. Sanjeev Dutta', email: 'chiefwarden@aitpune.edu.in' },
  warden: { title: 'Hostel Warden', name: 'Prof. M S Kulkarni', email: 'warden.obh@aitpune.edu.in' },
  mess_warden: { title: 'Mess Warden', name: 'Lt. Col. R K Sharma', email: 'mess@aitpune.edu.in' },
  lab_superintendent: { title: 'Lab Superintendent', name: 'Mr. S R Patil', email: 'labs@aitpune.edu.in' },
  hod_cse: { title: 'HoD Computer Science', name: 'Dr. S R Dhore', email: 'hodcomp@aitpune.edu.in' },
  hod_etc: { title: 'HoD E&TC', name: 'Dr. P B Karandikar', email: 'hodetc@aitpune.edu.in' },
  council: { title: 'General Secretary (Student Council)', name: 'Cadet Rohit Deshmukh', email: 'gensec@aitpune.edu.in' }
};

let campusShops = [
  {
    id: "shop-food-court",
    name: "Food Court",
    ownerName: "Rajesh Malhotra",
    phoneNumber: "+91 98224 51092",
    generalHours: "9:00 AM to 12:00 AM",
    approxClosing: "12:00 AM (Midnight)",
    slots: [{ start: [9, 0], end: [24, 0] }],
    icon: "fa-solid fa-utensils",
    onlineOrdering: true,
    pickupLocation: "Food Court Main Counter #1",
    upiId: "foodcourt.ait@okaxis",
    menu: [
      { id: "fc-1", name: "Special Veg Biryani + Raita", price: 90, type: "veg", tag: "Bestseller" },
      { id: "fc-2", name: "Hyderabadi Chicken Biryani", price: 130, type: "non-veg", tag: "Popular" },
      { id: "fc-3", name: "Paneer Butter Masala + 2 Butter Naan", price: 120, type: "veg", tag: "Chef Special" },
      { id: "fc-4", name: "Crispy Masala Dosa + Sambhar", price: 55, type: "veg", tag: "Breakfast / Snack" },
      { id: "fc-5", name: "Veg Schezwan Fried Rice", price: 80, type: "veg", tag: "Spicy" },
      { id: "fc-6", name: "Double Cheese Veg Burger", price: 65, type: "veg", tag: "Snack" },
      { id: "fc-7", name: "Butter Pav Bhaji (2 Pavs)", price: 70, type: "veg", tag: "Popular" },
      { id: "fc-8", name: "Chilled Thick Cold Coffee", price: 40, type: "veg", tag: "Beverage" }
    ]
  },
  {
    id: "shop-xerox",
    name: "Xerox",
    ownerName: "Sunil Sharma",
    phoneNumber: "+91 98501 34781",
    generalHours: "9:00 AM to 1:00 PM, 2:15 PM to 5:00 PM",
    approxClosing: "1:00 PM & 5:00 PM",
    slots: [
      { start: [9, 0], end: [13, 0] },
      { start: [14, 15], end: [17, 0] }
    ],
    icon: "fa-solid fa-print",
    onlineOrdering: false
  },
  {
    id: "shop-stationary",
    name: "Stationary Shop",
    ownerName: "Ramesh Gupta",
    phoneNumber: "+91 97632 89014",
    generalHours: "9:00 AM to 1:00 PM, 2:15 PM to 5:00 PM, 6:00 PM to 9:00 PM",
    approxClosing: "9:00 PM",
    slots: [
      { start: [9, 0], end: [13, 0] },
      { start: [14, 15], end: [17, 0] },
      { start: [18, 0], end: [21, 0] }
    ],
    icon: "fa-solid fa-pen-ruler",
    onlineOrdering: false
  },
  {
    id: "shop-juice",
    name: "Juice Shop",
    ownerName: "Anil Gaikwad",
    phoneNumber: "+91 98902 45618",
    generalHours: "9:00 AM to 11:00 PM",
    approxClosing: "11:00 PM",
    slots: [{ start: [9, 0], end: [23, 0] }],
    icon: "fa-solid fa-wine-glass",
    onlineOrdering: false
  },
  {
    id: "shop-icecream",
    name: "Ice Cream Parlour",
    ownerName: "Vikram Joshi",
    phoneNumber: "+91 98230 77123",
    generalHours: "5:00 PM to 10:00 PM",
    approxClosing: "10:00 PM",
    slots: [{ start: [17, 0], end: [22, 0] }],
    icon: "fa-solid fa-ice-cream",
    onlineOrdering: false
  },
  {
    id: "shop-barber",
    name: "Barber Shop",
    ownerName: "Mohan Lal",
    phoneNumber: "+91 98604 11985",
    generalHours: "9:00 AM to 1:00 PM, 3:00 PM to 8:00 PM",
    approxClosing: "1:00 PM & 8:00 PM",
    slots: [
      { start: [9, 0], end: [13, 0] },
      { start: [15, 0], end: [20, 0] }
    ],
    icon: "fa-solid fa-scissors",
    onlineOrdering: false
  },
  {
    id: "shop-drycleaner",
    name: "Dry Cleaner",
    ownerName: "Santosh Yadav",
    phoneNumber: "+91 98813 67420",
    generalHours: "10:00 AM to 2:00 PM, 4:00 PM to 8:00 PM",
    approxClosing: "2:00 PM & 8:00 PM",
    slots: [
      { start: [10, 0], end: [14, 0] },
      { start: [16, 0], end: [20, 0] }
    ],
    icon: "fa-solid fa-shirt",
    onlineOrdering: false
  },
  {
    id: "shop-oac",
    name: "OAC (Open Air Cafe)",
    ownerName: "Deepak Choudhary",
    phoneNumber: "+91 98221 89340",
    generalHours: "4:00 PM to 11:00 PM",
    approxClosing: "11:00 PM",
    slots: [{ start: [16, 0], end: [23, 0] }],
    icon: "fa-solid fa-mug-saucer",
    onlineOrdering: true,
    pickupLocation: "OAC Order Collection Window",
    upiId: "oac.aitpune@icici",
    menu: [
      { id: "oac-1", name: "Grilled Chicken Club Sandwich", price: 85, type: "non-veg", tag: "Popular" },
      { id: "oac-2", name: "Veg Cheese Burst Grilled Sandwich", price: 65, type: "veg", tag: "Bestseller" },
      { id: "oac-3", name: "Peri Peri French Fries (Large)", price: 60, type: "veg", tag: "Snack" },
      { id: "oac-4", name: "Steamed Chicken Momos (6 pcs) + Dip", price: 70, type: "non-veg", tag: "Student Favorite" },
      { id: "oac-5", name: "Fried Veg Paneer Momos (6 pcs)", price: 60, type: "veg", tag: "Snack" },
      { id: "oac-6", name: "KitKat Thick Shake with Whipped Cream", price: 65, type: "veg", tag: "Sweet" },
      { id: "oac-7", name: "Hot Adrak Masala Chai", price: 15, type: "veg", tag: "Hot Beverage" },
      { id: "oac-8", name: "Crispy Chicken Nuggets (8 pcs)", price: 80, type: "non-veg", tag: "Snack" }
    ]
  }
];

let shopOrders = [];
let orderTokenCounter = 100;

let borrowListings = [
  {
    id: 'listing_01',
    ownerId: 'user_ait_01',
    ownerName: 'Snehangshu Das',
    ownerEmail: 'snehangshu_22045@aitpune.edu.in',
    ownerHostel: 'OBH-1',
    ownerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    ownerRating: 4.9,
    title: 'Casio fx-991EX ClassWiz Scientific Calculator',
    description: 'High-resolution display, 552 functions, perfect for FE/SE Engineering Mathematics, FE Mechanics, and Matrix computations. Clean condition.',
    category: 'Electronics & IoT',
    transactionType: 'Rent',
    price: 30,
    rentalPeriod: 'per day',
    barterSkill: '',
    condition: 'Like New',
    imageUrl: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600&auto=format&fit=crop&q=80',
    status: 'Available',
    hostelBlock: 'OBH-1',
    createdAt: Date.now() - 3600000 * 24 * 2,
    tags: ['Calculator', 'Engineering Math', 'Casio'],
    views: 45
  },
  {
    id: 'listing_02',
    ownerId: 'user_ait_02',
    ownerName: 'Rohan Deshmukh',
    ownerEmail: 'rohan_22102@aitpune.edu.in',
    ownerHostel: 'OBH-2',
    ownerAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    ownerRating: 4.8,
    title: 'Arduino Uno R3 Ultimate Starter Kit + Sensor Shield',
    description: 'Includes Uno R3, breadboard, 30+ jumper wires, ultrasonic sensor HC-SR04, servo motor SG90, LCD 1602, and relay module.',
    category: 'Lab Equipment',
    transactionType: 'Rent',
    price: 50,
    rentalPeriod: 'per week',
    barterSkill: '',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=600&auto=format&fit=crop&q=80',
    status: 'Available',
    hostelBlock: 'OBH-2',
    createdAt: Date.now() - 3600000 * 48,
    tags: ['Arduino', 'IoT', 'Embedded', 'Sensors'],
    views: 78
  },
  {
    id: 'listing_03',
    ownerId: 'user_ait_03',
    ownerName: 'Tanvi Joshi',
    ownerEmail: 'tanvi_22340@aitpune.edu.in',
    ownerHostel: 'GH-1',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    ownerRating: 5.0,
    title: 'Higher Engineering Mathematics by B.S. Grewal (44th Edition)',
    description: 'Essential textbook for M-I, M-II, and M-III across all branches. Hardbound, zero torn pages, neatly highlighted formulas.',
    category: 'Textbooks',
    transactionType: 'Rent',
    price: 20,
    rentalPeriod: 'per week',
    barterSkill: '',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    status: 'Available',
    hostelBlock: 'GH-1',
    createdAt: Date.now() - 3600000 * 72,
    tags: ['BS Grewal', 'Mathematics', 'Textbook'],
    views: 62
  }
];

let borrowChats = [];
let borrowMessages = {};

// --- 2. HELPERS ---

function isShopOpenNow(shop) {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  if (!shop.slots || shop.slots.length === 0) return false;
  for (const slot of shop.slots) {
    const startMinutes = slot.start[0] * 60 + slot.start[1];
    const endMinutes = slot.end[0] * 60 + slot.end[1];
    if (currentMinutes >= startMinutes && currentMinutes < endMinutes) return true;
  }
  return false;
}

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
  });
  res.end(JSON.stringify(data));
  return true;
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

// --- 3. MAIN API DISPATCHER ---

async function handleApi(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS pre-flight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
    });
    res.end();
    return true;
  }

  // Not an API route
  if (!pathname.startsWith('/api')) {
    return false;
  }

  // 1. Session Endpoint
  if (pathname === '/api/session' || pathname === '/api/session/') {
    return sendJSON(res, 200, {
      success: true,
      user: {
        id: 'STU-2026-CURRENT',
        name: 'Snehangshu Das',
        regNo: '22045',
        role: 'student',
        branch: 'Computer Science',
        year: '3rd Year (TE)',
        hostel: 'OBH-1 Room 214',
        email: 'snehangshu_22045@aitpune.edu.in',
        phone: '+91 98220 12345',
        walletBalance: 240
      }
    });
  }

  // 2. Complaints API
  if ((pathname === '/api/complaints' || pathname === '/api/complaints/') && method === 'GET') {
    const category = parsedUrl.query.category;
    let filtered = [...complaints];
    if (category && category !== 'all') {
      filtered = filtered.filter(c => c.category === category);
    }
    return sendJSON(res, 200, { success: true, count: filtered.length, data: filtered });
  }

  if (pathname === '/api/complaints/stats' && method === 'GET') {
    const total = complaints.length;
    const resolved = complaints.filter(c => c.status === 'resolved').length;
    const in_progress = complaints.filter(c => c.status === 'in_progress').length;
    const investigating = complaints.filter(c => c.status === 'investigating').length;
    return sendJSON(res, 200, {
      success: true,
      stats: { total, resolved, in_progress, investigating, resolutionRate: total ? Math.round((resolved / total) * 100) : 0 }
    });
  }

  if (pathname === '/api/complaints/authorities' && method === 'GET') {
    return sendJSON(res, 200, { success: true, authorities: AUTHORITIES });
  }

  if (pathname.startsWith('/api/complaints/') && !pathname.endsWith('/vote') && method === 'GET') {
    const id = pathname.replace('/api/complaints/', '');
    const found = complaints.find(c => c.id === id);
    if (found) return sendJSON(res, 200, { success: true, data: found });
    return sendJSON(res, 404, { success: false, error: 'Complaint not found' });
  }

  if ((pathname === '/api/complaints' || pathname === '/api/complaints/') && method === 'POST') {
    const body = await parseBody(req);
    const newId = `AIT-2026-${String(complaints.length + 185).padStart(4, '0')}`;
    const newComplaint = {
      id: newId,
      category: body.category || 'hostel',
      title: body.title || 'Untitled Complaint',
      body: body.body || body.description || '',
      severity: body.severity || 3,
      visibility: body.visibility || 'public',
      hide_identity: !!body.hide_identity,
      assigned_roles: ['warden', 'chief_warden'],
      status: 'investigating',
      location: body.location || 'Campus Ground',
      reporter_id: body.reporter_id || 'STU-2026-CURRENT',
      reporter_name: body.reporter_name || 'Snehangshu Das',
      reporter_roll: body.reporter_roll || '22045',
      reporter_branch: body.reporter_branch || 'Computer Science',
      reporter_hostel: body.reporter_hostel || 'OBH-1 Room 214',
      upvote_count: 1,
      has_voted: true,
      created_at: new Date().toISOString(),
      sla_hours: 48,
      updates: [
        {
          id: `UPD-${Date.now()}`,
          author_role: 'system',
          author_name: 'Campus Automated Grievance Dispatcher',
          note: 'Complaint docket generated and assigned to designated authorities.',
          created_at: new Date().toISOString(),
          is_audit: true
        }
      ]
    };
    complaints.unshift(newComplaint);
    return sendJSON(res, 201, { success: true, message: 'Complaint registered successfully', data: newComplaint });
  }

  if (pathname.endsWith('/vote') && method === 'POST') {
    const parts = pathname.split('/');
    const id = parts[3];
    const target = complaints.find(c => c.id === id);
    if (target) {
      target.has_voted = !target.has_voted;
      target.upvote_count += target.has_voted ? 1 : -1;
      return sendJSON(res, 200, { success: true, upvote_count: target.upvote_count, has_voted: target.has_voted });
    }
    return sendJSON(res, 404, { success: false, error: 'Complaint not found' });
  }

  // 3. Shops API
  if ((pathname === '/api/shops' || pathname === '/api/shops/') && method === 'GET') {
    const list = campusShops.map(s => ({ ...s, isOpen: isShopOpenNow(s) }));
    return sendJSON(res, 200, { success: true, count: list.length, data: list });
  }

  if (pathname.startsWith('/api/shops/') && !pathname.includes('/order') && method === 'GET') {
    const id = pathname.replace('/api/shops/', '');
    const found = campusShops.find(s => s.id === id);
    if (found) {
      return sendJSON(res, 200, { success: true, data: { ...found, isOpen: isShopOpenNow(found) } });
    }
    return sendJSON(res, 404, { success: false, error: 'Shop not found' });
  }

  if (pathname === '/api/shops/order' && method === 'POST') {
    const body = await parseBody(req);
    const prefix = body.shopId === 'shop-oac' ? 'OAC' : 'FC';
    orderTokenCounter++;
    const token = body.token || `${prefix}-${orderTokenCounter}`;
    const newOrder = {
      token,
      shopId: body.shopId || (token.startsWith('OAC') ? 'shop-oac' : 'shop-food-court'),
      shopName: body.shopName || (token.startsWith('OAC') ? 'OAC' : 'Food Court'),
      items: body.items || [],
      totalPrice: body.totalPrice || body.totalAmount || 0,
      customerName: body.customerName || body.studentName || 'Snehangshu Das',
      customerPhone: body.customerPhone || body.studentPhone || '+91 98220 12345',
      upiRef: body.upiRef || body.utrNumber || 'UPI-' + Math.floor(100000 + Math.random() * 900000),
      status: 'Confirmed & In Kitchen Prep',
      prepTimeMins: '15-20 mins',
      pickupLocation: body.pickupLocation || (token.startsWith('OAC') ? 'OAC Order Collection Window' : 'Food Court Counter #1'),
      placedAt: body.placedAt || new Date().toISOString()
    };
    shopOrders.unshift(newOrder);
    return sendJSON(res, 201, { success: true, message: 'Pickup order confirmed', data: newOrder });
  }

  if (pathname.startsWith('/api/shops/orders/') && method === 'GET') {
    const token = pathname.replace('/api/shops/orders/', '');
    const found = shopOrders.find(o => o.token.toUpperCase() === token.toUpperCase());
    if (found) return sendJSON(res, 200, { success: true, data: found });
    return sendJSON(res, 404, { success: false, error: 'Order not found' });
  }

  // 4. Borrow API
  if ((pathname === '/api/borrow/listings' || pathname === '/api/borrow/listings/') && method === 'GET') {
    const category = parsedUrl.query.category;
    const type = parsedUrl.query.type;
    let filtered = [...borrowListings];
    if (category && category !== 'All') filtered = filtered.filter(l => l.category === category);
    if (type && type !== 'All') filtered = filtered.filter(l => l.transactionType === type);
    return sendJSON(res, 200, { success: true, count: filtered.length, data: filtered });
  }

  if ((pathname === '/api/borrow/listings' || pathname === '/api/borrow/listings/') && method === 'POST') {
    const body = await parseBody(req);
    const newListing = {
      id: `listing_${Date.now()}`,
      ownerId: body.ownerId || 'user_ait_01',
      ownerName: body.ownerName || 'Snehangshu Das',
      ownerEmail: body.ownerEmail || 'snehangshu_22045@aitpune.edu.in',
      ownerHostel: body.ownerHostel || 'OBH-1',
      ownerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      ownerRating: 5.0,
      title: body.title || 'Campus Item',
      description: body.description || '',
      category: body.category || 'Electronics & IoT',
      transactionType: body.transactionType || 'Rent',
      price: Number(body.price) || 0,
      rentalPeriod: body.rentalPeriod || 'per week',
      barterSkill: body.barterSkill || '',
      condition: body.condition || 'Like New',
      imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80',
      status: 'Available',
      hostelBlock: body.hostelBlock || 'OBH-1',
      createdAt: Date.now(),
      tags: [body.category, body.transactionType],
      views: 1
    };
    borrowListings.unshift(newListing);
    return sendJSON(res, 201, { success: true, message: 'Listing published', data: newListing });
  }

  if (pathname === '/api/borrow/conversations' && method === 'GET') {
    return sendJSON(res, 200, { success: true, data: borrowChats });
  }

  if (pathname.startsWith('/api/borrow/conversations/') && pathname.endsWith('/messages') && method === 'GET') {
    const chatId = pathname.split('/')[4];
    const msgs = borrowMessages[chatId] || [];
    return sendJSON(res, 200, { success: true, data: msgs });
  }

  if (pathname.startsWith('/api/borrow/conversations/') && pathname.endsWith('/messages') && method === 'POST') {
    const chatId = pathname.split('/')[4];
    const body = await parseBody(req);
    const newMsg = {
      id: `m_${Date.now()}`,
      senderId: body.senderId || 'user_ait_01',
      senderName: body.senderName || 'Snehangshu Das',
      text: body.text || '',
      timestamp: Date.now()
    };
    if (!borrowMessages[chatId]) borrowMessages[chatId] = [];
    borrowMessages[chatId].push(newMsg);
    return sendJSON(res, 201, { success: true, message: 'Message sent', data: newMsg });
  }

  // Fallback 404 for unhandled /api
  return sendJSON(res, 404, { success: false, error: 'API route not found' });
}

module.exports = {
  handleApi
};
