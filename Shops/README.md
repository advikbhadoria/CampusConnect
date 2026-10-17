# Campus Connect — Shop System (8 Campus Shops)

A lightweight, standalone module containing details and live operating status for **8 campus shops**, with **Online Ordering & Pre-Payment Confirmation for Offline Pickup** enabled for **Food Court** and **OAC**.

---

## 🏬 Registered Campus Shops

| Status Indicator | Shop Name | Owner Name | Phone Number | General Open / Close Times | Approx Closing Time | Online Ordering |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| 🟢/🔴 | **Food Court** | Rajesh Malhotra | +91 98224 51092 | 9:00 AM to 12:00 AM | 12:00 AM (Midnight) | ⚡ **Yes (Pickup)** |
| 🟢/🔴 | **Xerox** | Sunil Sharma | +91 98501 34781 | 9:00 AM to 1:00 PM, 2:15 PM to 5:00 PM | 1:00 PM & 5:00 PM | Counter |
| 🟢/🔴 | **Stationary Shop** | Ramesh Gupta | +91 97632 89014 | 9:00 AM to 1:00 PM, 2:15 PM to 5:00 PM, 6:00 PM to 9:00 PM | 9:00 PM | Counter |
| 🟢/🔴 | **Juice Shop** | Anil Gaikwad | +91 98902 45618 | 9:00 AM to 11:00 PM | 11:00 PM | Counter |
| 🟢/🔴 | **Ice Cream Parlour** | Vikram Joshi | +91 98230 77123 | 5:00 PM to 10:00 PM | 10:00 PM | Counter |
| 🟢/🔴 | **Barber Shop** | Santosh Salunkhe | +91 99754 12389 | 11:00 AM to 10:00 PM | 10:00 PM | Counter |
| 🟢/🔴 | **Thapa Shop** | Prem Bahadur Thapa | +91 98603 98145 | 6:00 PM to 9:00 PM | 9:00 PM | Counter |
| 🟢/🔴 | **OAC** | Harish Chandra | +91 98810 65432 | 8:00 AM to 10:30 PM | 10:30 PM | ⚡ **Yes (Pickup)** |

---

## ⚡ Features
- **Status Indicator in Front of Shop Name**: Displays a green dot + `Open` (🟢 Open) or red dot + `Close` (🔴 Close) evaluated in real-time against the current clock time.
- **Online Ordering for Food Court & OAC**:
  - Interactive menu modal with veg/non-veg indicators, item pricing, and quantity stepper `[- 1 +]`.
  - Live order bill summary calculating total amount in real time.
- **Pre-Payment Confirmation (Will to Buy)**:
  - Customers must pre-pay their bill before the order is finalized.
  - Displays instant UPI QR code, shop UPI ID (one-click copy), and accepts UPI UTR / Transaction Reference number.
- **Digital Pickup Token**:
  - On successful payment submission, generates a unique digital token (e.g., `FC-204`, `OAC-712`).
  - Displays designated pickup counter (e.g., *Food Court Counter #1* or *OAC Collection Window*) and approx prep time (15–20 mins).
  - Includes a direct "Save Token on WhatsApp" button for customer's offline verification at the counter.
- **Ticking Clock & Toolbar**: Live real-time clock, open shop counter, search box, and filter buttons (*All Shops (8)*, *Open Now*, *Closed*).
