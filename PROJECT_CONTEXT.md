# PROJECT CONTEXT
# White-Label Driving School Management SaaS Platform

> **Status:** Architecture & Technical Blueprinting  
> **Last Updated:** 2026-11-05  
> **Target Deployment:** Web Application & Google Play Store (Android Mobile App)  
> **Multi-Tenancy Model:** Shared Database, Tenant Isolation via `school_id` / Row Level Security (RLS)

---

## 1. Project Overview

We are building a modern, multi-tenant SaaS platform designed specifically for driving schools.

The primary objective is to digitize and simplify the daily operations of driving schools by providing a centralized platform where school owners can manage students, registrations, courses, fees, payments, and communication.

This platform is not designed for a single driving school. It is intended to serve multiple independent driving schools through one common application.

Every driving school should have its own business identity, branding, students, courses, and financial records while using the same underlying platform.

### Core Concept
**Build once, serve multiple driving schools, maintain separate business identities and data.**

For example:
- *Patil Driving School*
- *Shree Sai Driving School*
- *Omkar Driving School*

All three schools use the same platform, but their business information and data remain completely separate.

Each school maintains:
- Its own business name.
- Logo and branding.
- Primary and secondary theme colours (dynamic theming on Web and Mobile).
- Contact information.
- Business address.
- Unique school URL / slug (e.g., `/school/patil-ds` or subdomain `patil.platform.com`).
- Student records.
- Course information.
- Payment records and branded receipts.

The platform provides a consistent experience while allowing each school to feel that it is using its own customized management application.

---

## 2. Main Objectives

1. Digitize driving school management.
2. Eliminate dependency on manual registers and spreadsheets.
3. Simplify student registration and approval.
4. Help school owners manage students efficiently.
5. Maintain accurate fee and payment records.
6. Provide students with access to their own information.
7. Improve communication between schools and students.
8. Provide school-specific branding and identity.
9. Build a scalable subscription-based SaaS business.
10. Make the platform suitable for mobile application expansion (Google Play Store).

---

## 3. User Roles & Access Control

The platform has three primary user roles:

### A. Super Admin (Platform Administrator)
Manages the overall SaaS platform rather than an individual driving school.
- View all registered driving schools.
- Manage school accounts.
- Monitor platform activity.
- Manage school subscriptions and billing plans.
- Activate, suspend, or deactivate school accounts.
- View overall platform statistics and revenue metrics.
- Manage platform-wide settings.

### B. School Owner (Tenant Admin)
Represents an individual driving school. Has access strictly to their own school's information.
- Register their driving school.
- Configure school branding, colours, logo, and business information.
- Access the school dashboard with real-time operational metrics.
- Manage student registrations (Approve/Reject requests).
- View and manage student profiles.
- Create and manage driving courses.
- Assign courses to approved students.
- Manage course fees and payment installments.
- Record student payments (Cash, UPI, Bank Transfer).
- Track outstanding fees and payment balances.
- Generate and download branded payment receipts.
- View transaction history.
- Send announcements and personal notifications (In-app + WhatsApp).
- Monitor daily school activity.

### C. Student (End User)
Students are the end customers of individual driving schools.
- Create a student account.
- Search for a driving school by name, code, or location.
- Select a driving school and submit a membership request.
- Track membership approval status in real-time.
- Access the personalized Student Dashboard once approved.
- View assigned course details, syllabus, and duration.
- Check payment history, outstanding balance, and download receipts.
- Receive in-app notifications and WhatsApp updates.
- Manage personal profile details.

---

## 4. School Registration & Onboarding Flow

Driving school owners can register independently:

```mermaid
sequenceDiagram
    autonumber
    actor Owner as School Owner
    participant App as Platform (Web / App)
    participant DB as Central Database
    
    Owner->>App: Clicks "Register School"
    Owner->>App: Enters personal details (Name, Email, Phone, Password)
    Owner->>App: Enters school details (Name, Address, Contact, Slug)
    Owner->>App: Uploads Logo & picks Primary/Secondary Brand Colours
    App->>DB: Creates School record (status: trial/active)
    App->>DB: Creates User record (role: SCHOOL_OWNER) linked to school_id
    DB-->>App: Account provisioned
    App-->>Owner: Redirect to School Owner Dashboard
```

After registration, owners can update their branding, business profile, and banking/UPI details anytime.

---

## 5. Student Registration & Membership Flow

Students register independently without waiting for manual data entry by the owner:

```mermaid
sequenceDiagram
    autonumber
    actor Student as Student
    participant App as Common App
    participant DB as Database
    actor Owner as School Owner

    Student->>App: Registers with Name, Mobile, Email, Password
    App->>DB: Creates global Student User account
    Student->>App: Searches & selects Driving School
    Student->>App: Submits Membership Request
    App->>DB: Inserts SchoolMembership (status: PENDING)
    App-->>Owner: In-app & WhatsApp alert: "New student request"
    Owner->>App: Reviews request in Owner Dashboard
    alt Owner Approves
        Owner->>App: Approves Membership
        App->>DB: Updates SchoolMembership (status: APPROVED)
        App-->>Student: Notification: "Membership Approved! Welcome to [School]"
    else Owner Rejects
        Owner->>App: Rejects Membership (with optional reason)
        App->>DB: Updates SchoolMembership (status: REJECTED)
        App-->>Student: Notification: "Membership Request Declined"
    end
```

### Critical Architecture Rules for Memberships
- **User Account ≠ School Membership:** A student's user account exists globally. A membership links that user to a specific driving school.
- **Strict Gating:** Students cannot access school courses, fees, or data until membership status is `APPROVED`.
- **Multi-School Capability:** A student can hold memberships in multiple driving schools (e.g. 2-wheeler at School A, Heavy Vehicle at School B).
- **Tenant Scope:** A school owner can only view and act on membership requests directed to their own school.

---

## 6. Common Login System & Intelligent Routing

The application provides a unified login experience across Web and Mobile:

```
[ User enters Email/Phone + Password ]
                   │
                   ▼
       [ Authenticate Credentials ]
                   │
       ┌───────────┴───────────┐
       ▼                       ▼
[ Super Admin ]        [ Regular User ]
       │                       │
Redirect:                      ├─ Is School Owner? ──► Redirect: School Dashboard (/owner)
/admin/dashboard               │
                               └─ Is Student?
                                       │
                        ┌──────────────┴──────────────┐
                        ▼                             ▼
              [ Single Membership ]        [ Multiple Memberships ]
                        │                             │
            ┌───────────┴───────────┐         Show School Selection Screen
            ▼                       ▼
       [ APPROVED ]            [ PENDING ]
            │                       │
      Redirect to:            Redirect to:
     Student Portal         "Membership Under
    (/student/home)          Review" Screen
```

---

## 7. Core Application Modules (V1 Scope)

### Module 1: School Owner Dashboard
- **Key Metrics Tiles:** Total Students, Active Enrolled Students, Pending Membership Requests, Total Fees Collected, Outstanding Balance.
- **Recent Activity Feed:** Latest student registrations, latest payments recorded.
- **Quick Actions:** Record Payment, Enroll Student, Create Course, Send Announcement.
- **Strict Data Scope:** All analytics and lists are scoped strictly to `school_id`.

### Module 2: Student Management
- **List & Search:** Filter by status (Pending, Approved, Enrolled, Completed), search by name, phone, or registration number.
- **Student Profile View:** Personal contact info, joined date, assigned courses, payment transaction history, outstanding balance.
- **Membership Approval Workflow:** One-click approve/reject with automated student notification.
- **Course Enrollment Trigger:** Separate from membership approval.

### Module 3: Course Management
- **Course Catalog:** Create, edit, and toggle active/inactive status.
- **Course Details:** Course Name (e.g., *Four-Wheeler Basic + License*, *Two-Wheeler Refresher*), Duration (e.g., 20 Days, 1 Month), Fee Amount (₹ / $), Curriculum Description.
- **Course Assignment:** Owner assigns a course to an approved student with agreed fee and start date.

### Module 4: Fee & Payment Management
- **Fee Assignment:** Agreed course fee set at enrollment.
- **Payment Recording:** Supports Full Payment, Partial Installments, and Advance Bookings.
- **Payment Modes:** Cash, UPI (Google Pay, PhonePe, Paytm), Bank Transfer / Cheque.
- **Receipt Engine:** Generates instant digital receipts branded with the school's logo, colors, address, transaction ID, payment mode, balance remaining, and owner signature/stamp.
- **Immutable Financial Ledger:** Every payment is recorded as an individual immutable transaction. No silent updates or data overwriting. Balance = `Total Agreed Fee - SUM(Valid Transactions)`.

### Module 5: Notifications & Communication
- **In-App Notification Center:** Real-time bell alerts for owners and students.
- **WhatsApp Integration (Twilio / WhatsApp Business Cloud API):**
  - Instant alert on registration & approval.
  - Digital receipt link sent to student's WhatsApp on payment recording.
  - Fee reminder nudges for pending installments.
  - School announcements.

---

## 8. White-Label & Multi-Tenant Architecture

### Tenant Data Isolation (Row-Level Security)
Every tenant-owned table in PostgreSQL includes a `school_id` foreign key:
```sql
-- Enforced via Postgres RLS
CREATE POLICY tenant_isolation_policy ON students
    FOR ALL
    USING (school_id = current_setting('app.current_school_id')::uuid);
```
Under no circumstances can an API query return or mutate data across tenant boundaries.

### Dynamic White-Label Theming
Each school's branding configuration is loaded dynamically on both Web and Mobile:
```json
{
  "school_id": "sch_12345",
  "name": "Patil Driving School",
  "slug": "patil-ds",
  "logo_url": "https://cdn.platform.com/logos/patil.png",
  "theme": {
    "primary_color": "#1E40AF",
    "secondary_color": "#F59E0B",
    "accent_color": "#10B981",
    "font_family": "Inter"
  },
  "contact": {
    "phone": "+91 98765 43210",
    "email": "contact@patildrivingschool.com",
    "address": "Shop 4, City Center, Pune, MH"
  }
}
```

---

## 9. Technology Stack & Scalability Architecture

To ensure linear scalability, high security, and maximum code sharing between Web and Mobile:

| Layer | Technology Selected | Scalability & Implementation Rationale |
|---|---|---|
| **Web Frontend** | **Next.js (React 19 / TypeScript) + Tailwind CSS** | Server-side rendering, dynamic tenant slug routing (`/school/[slug]`), and Shadcn UI components. |
| **Mobile App (Play Store)** | **React Native with Expo** | Native Android app on Google Play Store sharing React hooks, state, types, and API calls with web. |
| **Mobile Build & Release** | **Expo EAS (Cloud Build & Submit)** | Automated CI/CD pipeline generating production Google Play `.aab` (Android App Bundle) binaries without manual Android Studio overhead. |
| **Backend & API Layer** | **Node.js (TypeScript) / Next.js API Routes** | High-concurrency async I/O, type-safe API contracts, fast JSON serialization. |
| **Database Engine** | **PostgreSQL (Supabase / Neon)** | ACID compliance, connection pooling (PgBouncer), and **Row-Level Security (RLS)** for unbreachable multi-tenant data isolation. |
| **ORM / Query Layer** | **Drizzle ORM / Prisma** | End-to-end type safety from database to React UI, zero runtime overhead, reproducible migrations. |
| **Receipt Engine** | **`@react-pdf/renderer`** | Generates dynamic, branded driving school payment receipts in PDF directly from React components. |
| **Asset & Receipt Storage** | **Cloudflare R2 / AWS S3** | S3-compatible cloud storage for school logos and receipts with **$0 egress fees**. |
| **Communication / Push** | **Meta WhatsApp Cloud API + Expo Push (FCM)** | Automated WhatsApp receipts/alerts and instant Android native push notifications. |

---

## 10. Mobile App & Google Play Store Strategy

Since the app will be published to the **Google Play Store**:

### Recommended Architecture: React Native with Expo (Hybrid Native)
- **Why Expo/React Native:**
  - Single TypeScript codebase powers both the **Google Play Store Android App** and the **Web Application**.
  - Dynamic white-label theming supported out-of-the-box (React Context / ThemeProvider updates colors, logos, and headers based on active school).
  - Native performance with push notifications (Expo Notifications), camera/receipt uploads, and offline cache.

### Google Play Store Compliance Guidelines
1. **Google Play In-App Billing vs. Business Software:**
   - *Driving school SaaS subscriptions paid by owners* can be handled via standard payment gateways (Razorpay / Stripe) on web, or Google Play In-App Subscriptions if subscribing directly through the app.
   - *Physical driving school fees paid by students* to schools are considered **physical services (offline driving instruction)** and are **exempt from Google Play In-App Billing 30%/15% cut** (Google Play Policy allows third-party payment methods / UPI for real-world services).
2. **Account Deletion Requirement:**
   - Google Play mandates that apps supporting account creation must provide an in-app and web-based account & data deletion request option.
3. **Closed Testing Rule:**
   - New personal Google Play developer accounts require **at least 20 testers opted in for at least 14 days** before opening to production.

---

## 11. Database Schema (PostgreSQL Blueprint)

```mermaid
erDiagram
    PLATFORM_ADMINS {
        uuid id PK
        string email
        string full_name
        timestamp created_at
    }

    SCHOOLS {
        uuid id PK
        string name
        string slug UK
        string logo_url
        string primary_color
        string secondary_color
        string phone
        string email
        string address
        string subscription_status
        timestamp created_at
    }

    USERS {
        uuid id PK
        string email UK
        string phone UK
        string password_hash
        string full_name
        string role "SUPER_ADMIN | SCHOOL_OWNER | STUDENT"
        timestamp created_at
    }

    SCHOOL_MEMBERSHIPS {
        uuid id PK
        uuid user_id FK
        uuid school_id FK
        string status "PENDING | APPROVED | REJECTED"
        timestamp requested_at
        timestamp reviewed_at
    }

    COURSES {
        uuid id PK
        uuid school_id FK
        string name
        string description
        integer duration_days
        decimal standard_fee
        boolean is_active
    }

    STUDENT_ENROLLMENTS {
        uuid id PK
        uuid school_id FK
        uuid student_id FK
        uuid course_id FK
        decimal agreed_fee
        string status "ONGOING | COMPLETED | CANCELLED"
        date start_date
        date completion_date
    }

    PAYMENT_TRANSACTIONS {
        uuid id PK
        uuid school_id FK
        uuid enrollment_id FK
        uuid student_id FK
        decimal amount
        string payment_mode "CASH | UPI | BANK_TRANSFER | CHEQUE"
        string reference_no
        string receipt_number UK
        string receipt_url
        timestamp recorded_at
    }

    NOTIFICATIONS {
        uuid id PK
        uuid school_id FK
        uuid recipient_user_id FK
        string title
        string message
        string channel "IN_APP | WHATSAPP"
        boolean is_read
        timestamp sent_at
    }

    SCHOOLS ||--o{ SCHOOL_MEMBERSHIPS : has
    USERS ||--o{ SCHOOL_MEMBERSHIPS : holds
    SCHOOLS ||--o{ COURSES : offers
    SCHOOLS ||--o{ STUDENT_ENROLLMENTS : manages
    COURSES ||--o{ STUDENT_ENROLLMENTS : enrolls
    STUDENT_ENROLLMENTS ||--o{ PAYMENT_TRANSACTIONS : logs
    SCHOOLS ||--o{ NOTIFICATIONS : sends
```

---

## 12. UI/UX Design Philosophy & Guidelines (Human-First & Minimalistic)

The entire application adheres strictly to a **minimalistic, clean, and extremely easy-to-use design philosophy**. 

Target users include driving school owners, receptionists, driving instructors, and students—many of whom are on mobile phones and are not tech-savvy. The software must be completely self-explanatory with zero training required.

### Core Design Rules
1. **Simplicity Over Clutter:** Prioritise usability over decorative visuals. Avoid unnecessary animations, dark sci-fi telemetry, complex gradients, and excessive shadows.
2. **Clear Purpose Per Screen:** No overcrowded layouts. Every screen communicates one primary objective with high visual clarity.
3. **Essential Dashboard Metrics Only:**
   - **Total Students** (All registered students)
   - **Active Students** (Currently undergoing training)
   - **Today's Driving Lessons** (Scheduled drives for today)
   - **Upcoming Lessons** (Scheduled drives for upcoming days)
   - **Pending Payments** (Total fee balance due to be collected)
   - **Recently Registered Students** (Latest enrollments requiring action)
4. **Frictionless Navigation:**
   - Clearly labelled menu items with familiar icons and text (`Dashboard`, `Students`, `Lessons`, `Payments`, `Settings`).
   - Flat hierarchy—avoid deeply nested submenus.
   - Thumb-friendly bottom navigation on mobile devices.
5. **Simple Student Management:**
   - Big, prominent **"+ Add Student"** button.
   - Plain forms with obvious labels, required field markers, and sensible defaults.
   - Clean profile view showing contact details, enrolled course, and payment balance.
6. **Effortless Driving Lesson Management:**
   - Simple date & time pickers.
   - Clear lesson statuses: `Scheduled` (Blue), `Completed` (Green), `Cancelled` (Red), `Pending` (Amber).
   - 1-click status update without navigating away from the list.
7. **Transparent Payments & Fees:**
   - 3 clean numbers: **Total Fee**, **Amount Paid**, **Balance Due**.
   - Simple "Record Payment" form with payment mode (Cash, UPI, Card).
   - Clean, branded digital receipt preview with instant print/WhatsApp share option.
8. **Smartphone-First Instructor Interface:**
   - Tailored for instructors viewing between driving sessions in the vehicle.
   - Large tap targets (min 48px).
   - Displays today's lesson sequence with student phone number (1-tap call) and 1-tap "Mark Completed" button.
9. **Instant User Feedback:**
   - Clear, friendly success toasts ("Student added successfully!", "Payment of ₹2,500 recorded!").
   - Confirmation dialog before irreversible deletions.
   - Clear loading and empty states.

---

## 13. V1 Scope Boundaries (Strict Adherence)

| Module | In V1 Scope | Post-V1 (Explicitly Excluded) |
|---|---|---|
| **School Management** | Owner registration, logo/colour branding, profile setup | Custom white-label domains (DNS mapping) |
| **Student Management** | Self-registration, school selection, approval/rejection | Driving test performance scoring, automated attendance |
| **Courses** | Course creation, duration, fee setting, manual assignment | Online video lessons / LMS, interactive quizzes |
| **Finances** | Fee tracking, cash/UPI manual entry, installments, PDF receipts | Integrated payment gateway checkout (direct in-app student payment) |
| **Communication** | In-app alerts, basic WhatsApp registration & payment alerts | Automated AI chat bot, two-way WhatsApp conversational bot |
| **Operations** | *None* | Instructor allocation, car/fleet maintenance, fuel tracking, GPS tracking |

---

## 14. Next Action Plan & Milestones

1. **Phase 1: Frontend UI/UX System (Completed & Streamlined)**
   - [x] Initialized React 19 + TypeScript + Vite frontend project in `./frontend`.
   - [x] Implemented dynamic white-label CSS variables (`--school-primary`, etc.) for on-the-fly tenant rebranding across all driving schools.
   - [x] Streamlined UX to a clean, human-first, minimalistic interface suitable for non-technical users on smartphones and desktop PCs:
     - **School Owner View (`DashboardView.tsx`, `Sidebar.tsx`)**: 4 essential metrics (Today's Lessons, Active Students, Pending Fees, Upcoming Lessons) + desktop sidebar and fast-action modals.
     - **Instructor Smartphone View (`InstructorView.tsx`)**: Interactive 4-day calendar strip (`Today`, `Tomorrow`, `Friday`, `Saturday`), chronological student cards, 1-tap "Mark Lesson Done", 1-tap WhatsApp reminder, and 1-tap Reschedule modal.
     - **Student Portal (`StudentPortalView.tsx`)**: Clear course progress bar, instructor details with 1-tap call, upcoming lesson reminder, and payment receipts.
     - **1-Tap Form Presets (`ScheduleLessonModal.tsx`, `AddStudentModal.tsx`, `RecordPaymentModal.tsx`)**:
       - 1-tap syllabus topic chips (*Clutch & Steering, Reverse Parking, Traffic & Roundabouts, Highway Merging, Hill Start, Mock Test*).
       - Auto instructor & vehicle matching by course.
       - Quick-fill payment buttons (*Full Due, Deposit, Pay Later*).
       - Removed duplicate in-page navigation tabs in favor of the canonical bottom bar.
   - [x] Verified zero-error production build (`npm run build`).

2. **Phase 2: Backend API & Database (Next)**
   - Set up PostgreSQL schema with multi-tenant Row-Level Security (`school_id`).
   - Implement authentication & role-based middleware.
   - Connect frontend state to persistent backend endpoints.

3. **Phase 3: Mobile Client & Google Play Readiness**
   - Package mobile app using React Native / Expo.
   - Configure Expo EAS for Android App Bundle (`.aab`) builds.
   - Prepare Google Play Store listing assets and closed-testing track.
