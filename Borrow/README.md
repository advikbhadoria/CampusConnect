# CampusSync — AIT Pune Peer-to-Peer Marketplace & Skill-Barter

**CampusSync** is a hyper-local peer-to-peer rental, marketplace, and skill-barter web application built strictly for students of **Army Institute of Technology (AIT), Pune** (`@aitpune.edu.in`).

Students can rent lab equipment, buy/sell semester engineering books and hostel gear, and trade technical skills (e.g. debugging React/Node assignments in exchange for CAD mentoring or exam notes).

---

## 🌟 Key Features

1. **Gatekeeper Authentication & Security**:
   - Registration strictly restricted to the `@aitpune.edu.in` domain.
   - Non-institutional domains (e.g. `@gmail.com`, `@yahoo.com`) are rejected with clear error prompts.
   - Email verification gate step ensuring verified campus access.

2. **Adaptive "Skill-Barter" UI**:
   - When **"Skill-Barter"** is selected, the pricing input dynamically transforms into a dedicated trade prompt: *"What skill or help do you want in return?"* with instant suggestion chips.
   - Distinctive purple gradient badges & highlight cards on the feed for all active skill exchanges.

3. **Real-Time Peer-to-Peer Chat & Negotiation**:
   - Pinned item header with thumbnail, asking price / trade requirement.
   - Quick negotiation chips: *"Is this available in OBH?"*, *"Can we meet at Nescafe at 6 PM?"*, *"I can help with your assignment!"*.
   - Live message history and unread badge counters.

4. **Campus-Tailored Filtering & Hostels**:
   - Filter by transaction type: **All**, **🔄 Skill-Barter Only**, **⏳ For Rent**, **🏷️ For Sale**.
   - Filter by categories: *Electronics & IoT, Lab Tools & Drafters, SPPU Books & Notes, Cycles & Mobility, Hostel Essentials, Sports & Gym*.
   - Filter by AIT Pune hostel blocks: *OBH-1, OBH-2, OBH-3, NBH-1, NBH-2, GH-1, GH-2, Day Scholar*.

5. **Dual Backend Architecture**:
   - **Production Mode**: Full Firebase Auth, Cloud Firestore database, and strict `firestore.rules`.
   - **Live Campus Preview Mode**: Pre-seeded with realistic AIT Pune campus items so the application is immediately interactive out of the box.

---

## 📁 Project Structure

```
Campus-Sync/
├── .env.example              # Firebase configuration template
├── firestore.rules           # Cloud Firestore security rules
├── index.html                # HTML5 entry with Inter font
├── package.json              # Project dependencies (React 18, Vite 6, Tailwind 3, Lucide)
├── tailwind.config.js        # Custom campus color palette & tokens
├── vite.config.ts            # Vite configuration
└── src/
    ├── main.tsx              # React DOM entry point
    ├── App.tsx               # Root app layout & modal manager
    ├── index.css             # Tailwind base & glassmorphism utilities
    ├── config/
    │   └── firebase.ts       # Firebase initialization & fallback detection
    ├── context/
    │   ├── AuthContext.tsx   # Domain gatekeeping & verification state
    │   └── MarketplaceContext.tsx # Feed state, filters, listings CRUD, and chat
    ├── types/
    │   └── index.ts          # TypeScript interfaces
    ├── data/
    │   └── seedData.ts       # Realistic AIT Pune campus items & users
    ├── services/
    │   ├── authService.ts    # @aitpune.edu.in auth validator & Firebase Auth
    │   ├── listingService.ts # Firestore query & listings CRUD
    │   └── chatService.ts    # Real-time peer-to-peer messaging
    └── components/
        ├── layout/
        │   ├── Navbar.tsx    # AIT branding, search bar, and user dropdown
        │   ├── Banner.tsx    # Campus highlight banner & quick filters
        │   └── Footer.tsx    # Campus rules and handover locations
        ├── auth/
        │   ├── AuthModal.tsx # Gatekeeper modal with @aitpune.edu.in validation
        │   └── VerificationPrompt.tsx # Email verification gating screen
        ├── marketplace/
        │   ├── Dashboard.tsx # Main feed with responsive grid
        │   ├── FilterBar.tsx # Tabs, category chips, hostel picker, sorting
        │   ├── ListingCard.tsx # Visual cards with Rent/Sell/Barter badges
        │   ├── ItemDetailModal.tsx # Item specifications & owner trust rating
        │   ├── AddListingModal.tsx # Dynamic form with adaptive Skill-Barter UI
        │   └── MyListingsView.tsx # Student item management & saved bookmarks
        └── chat/
            └── ChatDrawer.tsx # Slide-out messenger with pinned item header
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

### 3. (Optional) Connect to Live Firebase
1. Create a project on the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Email/Password** in **Authentication**.
3. Create a **Cloud Firestore** database.
4. Copy `.env.example` to `.env` and fill in your credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
5. Deploy the provided `firestore.rules` in Firebase Console or via Firebase CLI.

---

## 🛡️ Pre-Loaded Demo Test Accounts

For immediate testing, click the quick-login cards in the login modal or use:
- **Student 1 (OBH-2)**: `aarav.comp23@aitpune.edu.in` / `password123`
- **Student 2 (GH-1)**: `priya.it24@aitpune.edu.in` / `password123`
