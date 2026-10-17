/**
 * ==============================================================================
 * CAMPUS SHOPS DATA - 8 REGISTERED SHOPS
 * Includes Online Ordering & Prepaid Pickup for Food Court & OAC
 * ==============================================================================
 */

const CAMPUS_SHOPS = [
  {
    id: "shop-food-court",
    name: "Food Court",
    ownerName: "Rajesh Malhotra",
    phoneNumber: "+91 98224 51092",
    generalHours: "9:00 AM to 12:00 AM",
    approxClosing: "12:00 AM (Midnight)",
    slots: [
      { start: [9, 0], end: [24, 0] }
    ],
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
    approxClosing: "1:00 PM (Afternoon break) & 5:00 PM (Evening)",
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
    slots: [
      { start: [9, 0], end: [23, 0] }
    ],
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
    slots: [
      { start: [17, 0], end: [22, 0] }
    ],
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
    slots: [
      { start: [11, 0], end: [22, 0] }
    ],
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
    slots: [
      { start: [18, 0], end: [21, 0] }
    ],
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
    slots: [
      { start: [8, 0], end: [22, 30] }
    ],
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
