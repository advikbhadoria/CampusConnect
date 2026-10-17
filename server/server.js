/**
 * ==============================================================================
 * CAMPUS CONNECT UNIFIED SERVER & API GATEWAY
 * ==============================================================================
 * Unifies:
 * 1. Base College Web Application & Portals (Feed, Faculty, Alumni, Clubs, Aakriti, Outpass)
 * 2. /api/complaints/... (Complaint Management & Grievance Redressal Portal)
 * 3. /api/shops/...      (8 Campus Shops, Live Operating Status & Online Ordering)
 * 4. /api/borrow/...     (CampuSync Peer-to-Peer Rental, Secondhand Gear & Skill-Barter)
 * 5. /api/session        (Global Student Session Synchronization)
 * ==============================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.resolve(__dirname, '..');

// ==============================================================================
// 1. DATA STORES (In-Memory with Pre-Seeded Datasets)
// ==============================================================================

// --- 1.1 COMPLAINTS DATA ---
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

// --- 1.2 CAMPUS SHOPS DATA ---
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
    ownerName: "Santosh Salunkhe",
    phoneNumber: "+91 99754 12389",
    generalHours: "11:00 AM to 10:00 PM",
    approxClosing: "10:00 PM",
    slots: [{ start: [11, 0], end: [22, 0] }],
    icon: "fa-solid fa-scissors",
    onlineOrdering: false
  },
  {
    id: "shop-thapa",
    name: "Thapa Shop",
    ownerName: "Prem Bahadur Thapa",
    phoneNumber: "+91 98603 98145",
    generalHours: "6:00 PM to 9:00 PM",
    approxClosing: "9:00 PM",
    slots: [{ start: [18, 0], end: [21, 0] }],
    icon: "fa-solid fa-mug-hot",
    onlineOrdering: false
  },
  {
    id: "shop-oac",
    name: "OAC",
    ownerName: "Harish Chandra",
    phoneNumber: "+91 98810 65432",
    generalHours: "8:00 AM to 10:30 PM",
    approxClosing: "10:30 PM",
    slots: [{ start: [8, 0], end: [22, 30] }],
    icon: "fa-solid fa-mug-saucer",
    onlineOrdering: true,
    pickupLocation: "OAC Order Collection Window",
    upiId: "oacafe.ait@upi",
    menu: [
      { id: "oac-1", name: "Signature OAC Double Cheese Maggi", price: 55, type: "veg", tag: "Iconic" },
      { id: "oac-2", name: "Spicy Peri-Peri Veg Maggi", price: 45, type: "veg", tag: "Student Favorite" },
      { id: "oac-3", name: "Jumbo Grilled Paneer Cheese Sandwich", price: 65, type: "veg", tag: "Crispy" },
      { id: "oac-4", name: "Loaded Chicken Grilled Club Sandwich", price: 85, type: "non-veg", tag: "Bestseller" },
      { id: "oac-5", name: "Bread Omelette (Double Egg with Green Chutney)", price: 45, type: "non-veg", tag: "Quick Bite" },
      { id: "oac-6", name: "OAC Special Cold Coffee with Ice Cream", price: 60, type: "veg", tag: "Chilled" },
      { id: "oac-7", name: "Crispy Samosa Chaat Bowl (2 Samosas)", price: 40, type: "veg", tag: "Evening Snack" },
      { id: "oac-8", name: "Fresh Lemon Mint Iced Tea", price: 35, type: "veg", tag: "Refreshing" }
    ]
  }
];

let shopOrders = [];
let orderTokenCounter = 100;

function isShopOpenNow(shop) {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  return shop.slots.some(slot => {
    const startMins = slot.start[0] * 60 + slot.start[1];
    const endMins = slot.end[0] * 60 + slot.end[1];
    return currentMinutes >= startMins && currentMinutes < endMins;
  });
}

// --- 1.3 BORROW & SHARE LISTINGS ---
let borrowListings = [
  {
    id: 'listing_01',
    ownerId: 'user_ait_01',
    ownerName: 'Aarav Sharma',
    ownerEmail: 'aarav.comp23@aitpune.edu.in',
    ownerHostel: 'OBH-2',
    ownerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    ownerRating: 4.9,
    title: 'Arduino Mega 2560 + Complete 37 Sensor Kit',
    description: 'Original Arduino Mega with ultrasonic, flame, DHT11, servo motor, jumper wires, and breadboard. Ready for lab testing.',
    category: 'Electronics & IoT',
    transactionType: 'Rent',
    price: 45,
    rentalPeriod: 'per week',
    condition: 'Like New',
    imageUrl: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=600&auto=format&fit=crop&q=80',
    status: 'Available',
    hostelBlock: 'OBH-2',
    createdAt: Date.now() - 1000 * 60 * 60 * 3,
    tags: ['IoT', 'Arduino', 'Robotics', 'Rent'],
    views: 84
  },
  {
    id: 'listing_02',
    ownerId: 'user_ait_03',
    ownerName: 'Rohan Verma',
    ownerEmail: 'rohan.mech22@aitpune.edu.in',
    ownerHostel: 'NBH-1',
    ownerAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    ownerRating: 5.0,
    title: 'Engineering Graphics Mini Drafter + Heavy-Duty Tube',
    description: 'Omega professional mini-drafter with locking knob + black sheet storage tube + set squares. Completely calibrated.',
    category: 'Lab Tools & Drafters',
    transactionType: 'Skill-Barter',
    price: 0,
    barterSkill: 'Need help debugging my Web Tech Node.js backend assignment (approx 1-2 hours)',
    condition: 'Gently Used',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80',
    status: 'Available',
    hostelBlock: 'NBH-1',
    createdAt: Date.now() - 1000 * 60 * 60 * 8,
    tags: ['Barter', 'Drafter', 'Mech', 'Graphics'],
    views: 142
  },
  {
    id: 'listing_03',
    ownerId: 'user_ait_02',
    ownerName: 'Priya Deshmukh',
    ownerEmail: 'priya.it24@aitpune.edu.in',
    ownerHostel: 'GH-1',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    ownerRating: 4.8,
    title: 'SPPU Engineering Mathematics M3 (Nirali Publications)',
    description: 'Clean textbook with solved university papers from 2019-2024. All Laplace, Fourier, and Vector Calculus formulas highlighted.',
    category: 'Books & Notes',
    transactionType: 'Sell',
    price: 180,
    rentalPeriod: '',
    condition: 'Good Condition',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    status: 'Available',
    hostelBlock: 'GH-1',
    createdAt: Date.now() - 1000 * 60 * 60 * 12,
    tags: ['SPPU', 'Maths', 'Books', 'Exam'],
    views: 95
  }
];

let borrowChats = [
  {
    chatId: 'chat_1',
    listingId: 'listing_02',
    listingTitle: 'Engineering Graphics Mini Drafter + Heavy-Duty Tube',
    listingImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80',
    listingPrice: 'Skill-Barter',
    transactionType: 'Skill-Barter',
    barterSkill: 'Need help debugging my Web Tech Node.js backend assignment',
    participants: ['user_ait_01', 'user_ait_03'],
    participantDetails: {
      'user_ait_01': { name: 'Aarav Sharma', hostel: 'OBH-2' },
      'user_ait_03': { name: 'Rohan Verma', hostel: 'NBH-1' }
    },
    lastMessage: 'Hey! I can help you with your Node.js routing tonight at Nescafe!',
    lastMessageTimestamp: Date.now() - 1000 * 60 * 25
  }
];

let borrowMessages = {
  'chat_1': [
    { id: 'm1', senderId: 'user_ait_01', senderName: 'Aarav Sharma', text: 'Hi Rohan! Saw your listing for the mini-drafter.', timestamp: Date.now() - 1000 * 60 * 30 },
    { id: 'm2', senderId: 'user_ait_03', senderName: 'Rohan Verma', text: 'Hey! I can help you with your Node.js routing tonight at Nescafe!', timestamp: Date.now() - 1000 * 60 * 25 }
  ]
};

// ==============================================================================
// 2. MIME TYPES & STATIC FILE SERVING
// ==============================================================================
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.ts': 'application/javascript; charset=utf-8',
  '.tsx': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4'
};

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-client-info'
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

// ==============================================================================
// 3. HTTP REQUEST DISPATCHER
// ==============================================================================
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = decodeURIComponent(parsedUrl.pathname);
  const method = req.method.toUpperCase();

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-client-info'
    });
    return res.end();
  }

  // --- API ROUTE HANDLERS ---
  if (pathname.startsWith('/api/')) {
    
    // ----------------------------------------------------
    // 1. Session Endpoint
    // ----------------------------------------------------
    if (pathname === '/api/session') {
      return sendJSON(res, 200, {
        name: "Snehangshu Das",
        role: "student",
        branch: "Computer Science",
        year: "3rd Year",
        regNo: "22045",
        hostel: "OBH-1",
        room: "214",
        email: "snehangshu_22045@aitpune.edu.in",
        phone: "+91 98220 12345"
      });
    }

    // ----------------------------------------------------
    // 2. Complaints API Endpoints
    // ----------------------------------------------------
    if (pathname === '/api/complaints' && method === 'GET') {
      const role = parsedUrl.query.role || 'student';
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
        stats: { total, resolved, in_progress, investigating, resolutionRate: total ? Math.round((resolved/total)*100) : 0 }
      });
    }

    if (pathname === '/api/complaints/authorities' && method === 'GET') {
      return sendJSON(res, 200, { success: true, authorities: AUTHORITIES });
    }

    if (pathname.startsWith('/api/complaints/') && method === 'GET') {
      const id = pathname.replace('/api/complaints/', '');
      const found = complaints.find(c => c.id === id);
      if (found) return sendJSON(res, 200, { success: true, data: found });
      return sendJSON(res, 404, { success: false, error: 'Complaint not found' });
    }

    if (pathname === '/api/complaints' && method === 'POST') {
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

    // ----------------------------------------------------
    // 3. Shops API Endpoints
    // ----------------------------------------------------
    if (pathname === '/api/shops' && method === 'GET') {
      const list = campusShops.map(s => ({
        ...s,
        isOpen: isShopOpenNow(s)
      }));
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
      const token = `${prefix}-${orderTokenCounter}`;
      const newOrder = {
        token,
        shopId: body.shopId,
        shopName: body.shopName || (body.shopId === 'shop-oac' ? 'OAC' : 'Food Court'),
        items: body.items || [],
        totalAmount: body.totalAmount || 0,
        studentName: body.studentName || 'Snehangshu Das',
        studentRegNo: body.studentRegNo || '22045',
        studentHostel: body.studentHostel || 'OBH-1',
        studentPhone: body.studentPhone || '+91 98220 12345',
        paymentMethod: body.paymentMethod || 'UPI Pre-Paid',
        utrNumber: body.utrNumber || 'UPI-' + Math.floor(100000 + Math.random() * 900000),
        status: 'Confirmed & In Kitchen Prep',
        prepTimeMins: '15-20 mins',
        pickupLocation: body.shopId === 'shop-oac' ? 'OAC Order Collection Window' : 'Food Court Counter #1',
        createdAt: new Date().toISOString()
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

    // ----------------------------------------------------
    // 4. Borrow & Share API Endpoints
    // ----------------------------------------------------
    if (pathname === '/api/borrow/listings' && method === 'GET') {
      const category = parsedUrl.query.category;
      const type = parsedUrl.query.type;
      let filtered = [...borrowListings];
      if (category && category !== 'All') {
        filtered = filtered.filter(l => l.category === category);
      }
      if (type && type !== 'All') {
        filtered = filtered.filter(l => l.transactionType === type);
      }
      return sendJSON(res, 200, { success: true, count: filtered.length, data: filtered });
    }

    if (pathname === '/api/borrow/listings' && method === 'POST') {
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
      return sendJSON(res, 201, { success: true, data: newMsg });
    }

    return sendJSON(res, 404, { success: false, error: 'API endpoint not found' });
  }

  // --- STATIC FILE SERVING ---
  let reqPath = pathname === '/' ? '/homepage/homepage.html' : pathname;
  
  // Normalize path & prevent directory traversal
  let safePath = path.normalize(path.join(ROOT_DIR, reqPath));
  if (!safePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Access Denied');
  }

  // If path is a directory, look for index.html
  if (fs.existsSync(safePath) && fs.statSync(safePath).isDirectory()) {
    const indexPath = path.join(safePath, 'index.html');
    if (fs.existsSync(indexPath)) {
      safePath = indexPath;
    }
  }

  // Check file existence
  if (!fs.existsSync(safePath) || fs.statSync(safePath).isDirectory()) {
    // If route doesn't match a physical file, check fallback
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(`
      <!DOCTYPE html>
      <html>
      <head><title>404 - Not Found</title></head>
      <body style="font-family:sans-serif; text-align:center; padding:50px; background:#f0f7ff; color:#0f172a;">
        <h2>🎓 Campus Connect - Page Not Found</h2>
        <p>The requested route <code>${reqPath}</code> was not found.</p>
        <a href="/homepage/homepage.html" style="color:#2563eb; text-decoration:underline;">← Return to Campus Connect Home</a>
      </body>
      </html>
    `);
  }

  const ext = path.extname(safePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache'
  });

  const fileStream = fs.createReadStream(safePath);
  fileStream.pipe(res);
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🎓 CAMPUS CONNECT UNIFIED SERVER RUNNING AT:`);
  console.log(`   🔗 http://localhost:${PORT}`);
  console.log(`   🔗 http://localhost:${PORT}/homepage/homepage.html`);
  console.log(`   🏬 http://localhost:${PORT}/Shops/index.html`);
  console.log(`   📢 http://localhost:${PORT}/Complain/dist/index.html`);
  console.log(`   🤝 http://localhost:${PORT}/Borrow/dist/index.html`);
  console.log(`=======================================================`);
});
