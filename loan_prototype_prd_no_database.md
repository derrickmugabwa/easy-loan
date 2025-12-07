# Product Requirements Document (PRD)

## Project Title
Loan Eligibility & Verification Fee Prototype (No Database)

## Version
v1.0

## Prepared By
Derrick Mugabwa

## Last Updated
2025-12-04

---

## 1. Purpose of This Document
This document defines the product requirements for a loan application **prototype** that allows users to:
- Enter personal details
- Check loan eligibility using a random engine
- View a generated loan offer
- Pay a small verification fee via M-Pesa STK Push

The system will **not use any permanent database** and is strictly for **demo/prototype purposes**.

---

## 2. Product Overview
The product is a **web-based loan simulation platform** that mimics the flow of a real digital lending system. The goal is to demonstrate:
- User onboarding
- Automated eligibility checking
- Loan offer generation
- M-Pesa payment integration

⚠️ This system **does NOT disburse real loans**.

---

## 3. Objectives
- Demonstrate a realistic digital loan flow
- Validate M-Pesa STK Push integration
- Showcase random eligibility logic
- Avoid legal risks by not persisting sensitive user data
- Build fast with zero database dependency

---

## 4. Target Users
- Demo users
- Investors
- Product testers
- Hackathon judges
- Internal product teams

---

## 5. In-Scope Features
- Loan application form
- Random loan eligibility engine
- Loan overview page
- Verification fee setup
- M-Pesa STK push payment
- Payment success/failure handling
- Data handling via session & memory

## 6. Out-of-Scope Features
- Actual loan disbursement
- User accounts & authentication
- Credit scoring
- Loan history storage
- Document uploads
- SMS notifications

---

## 7. User Flow

1. User visits website
2. User enters:
   - Full Name
   - Phone Number (M-Pesa)
   - National ID
   - Loan Type
3. User clicks **Check Eligibility**
4. System runs random eligibility engine
5. If approved → Loan Overview page is shown
6. If rejected → Rejection message is shown
7. User clicks **Get Loan**
8. STK push is triggered
9. Payment confirmed → Success message is shown

---

## 8. Loan Types & Ranges

| Loan Type | Min (KES) | Max (KES) |
|-----------|-----------|-----------|
| Emergency | 500       | 5,000     |
| Personal  | 2,000     | 20,000    |
| Business  | 5,000     | 50,000    |
| Salary    | 3,000     | 30,000    |

Repayment Period: 30 Days (default)
Interest Rate: Fixed (e.g. 8–12%)

---

## 9. Eligibility Engine Rules
- Approval Rate: 60–70%
- Rejection Rate: 30–40%
- Loan amount generated randomly within selected loan type range
- Eligibility engine runs on the backend

---

## 10. Verification Fee
- Fixed amount (configurable):
  - KES 49 / 99 / 199
- Must be paid before loan status changes to verified

---

## 11. Payment Integration (M-Pesa)
- Uses Safaricom Daraja API
- Required APIs:
  - Access Token API
  - STK Push API
  - Payment Callback API

### Payment Flow:
1. User clicks **Get Loan**
2. Backend triggers STK Push
3. User enters M-Pesa PIN
4. Safaricom sends callback
5. System displays result

---

## 12. Data Handling (No Database Design)

### Frontend Storage:
- sessionStorage used to store:
  - User details
  - Eligibility response

### Backend Storage:
- In-memory objects inside Next.js API routes
- Cleared on server restart or redeploy

⚠️ No personal data is persisted permanently.

---

## 13. System Architecture

- Framework: **Next.js (Full-Stack)**
- Frontend: Next.js App Router + Tailwind + ShadCN
- Backend: Next.js API Routes / Server Actions
- Payment: Safaricom Daraja API
- Storage: Session-based & in-memory only
- Hosting:
  - App (Frontend + Backend): Vercel / VPS

---

## 14. Non-Functional Requirements
- Fast response time (< 2 seconds)
- Secure handling of phone numbers
- Mask sensitive details on UI
- Mobile responsive UI
- Clear demo disclaimer displayed
- Toast notifications must be non-intrusive and not block user flow

---

## 15. Random Loan Disbursement Toast Notifications

### Description
The system will display **random toast notifications** simulating loan disbursements to other users in real time. This feature is intended to:
- Increase realism
- Improve user trust
- Enhance conversion during the demo

### Behavior Rules
- Toast appears every 10–25 seconds (random interval)
- Each toast shows:
  - Random masked user name (e.g. "John K.")
  - Random masked phone (e.g. "07** *** 321")
  - Random loan type
  - Random loan amount within defined ranges

### Example Toast Messages
- "Sarah M. just received KES 12,500 (Personal Loan)"
- "Kevin O. just received KES 3,200 (Emergency Loan)"
- "Anonymous user just received KES 25,000 (Business Loan)"

### Data Source
- Entirely **randomly generated on the frontend**
- No real users involved
- No backend or database dependency

### Compliance Notice
Each toast must include a small disclaimer indicator:
> "Simulated activity"

---

## 15. Legal & Compliance Notes
- System must display clear disclaimer:

> "This is a demo system. No real loans are issued."

- No persistent storage of:
  - National ID
  - Phone number

- M-Pesa production usage requires Safaricom approval

---

## 16. Success Metrics
- Successful eligibility check flow
- Successful STK push payment
- Proper UI navigation
- No system crashes

---

## 17. Risks & Mitigation

| Risk | Mitigation |
|------|------------|
| Legal compliance | Demo disclaimer, no DB |
| Payment failures | Retry mechanism |
| Fake user trust | Clear prototype labeling |
| API downtime | Timeout & fallback messaging |

---

## 18. Future Enhancements
- Admin dashboard
- User loan history
- Credit score simulation
- SMS integration
- Real loan disbursement

---

## 19. Approval

This PRD is approved for development as a **prototype only**.

---

✅ END OF DOCUMENT

