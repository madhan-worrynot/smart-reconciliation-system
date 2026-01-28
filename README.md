📘 Smart Reconciliation & Audit System (MERN Stack)
📌 Overview

Smart Reconciliation System is a full-stack MERN application designed to automate financial transaction reconciliation, detect duplicates and mismatches, support manual corrections, and maintain a complete audit trail.
The system allows users to upload transaction files, automatically reconcile data, visualize reconciliation analytics, and track all changes for compliance.

🧱 Architecture

Frontend (React)

Dashboard with analytics & charts

CSV upload with column mapping

Reconciliation result viewer

Manual correction UI

Audit timeline visualization

Backend (Node.js + Express)

Secure JWT authentication

CSV processing & ingestion

Reconciliation engine

Audit logging system

Dashboard analytics APIs

Database (MongoDB)

Upload Jobs

Transaction Records

Reconciliation Results

Audit Logs

Users

⚙️ Core Features

✔ File upload (CSV)
✔ Dynamic column mapping
✔ Auto reconciliation per upload batch
✔ Match types: Matched, Partial, Duplicate, Unmatched
✔ Dashboard analytics with filters
✔ Manual record correction
✔ Full audit trail timeline
✔ Multi-upload batch handling

📊 Reconciliation Logic
Condition	Result
Exact match on transaction ID & amount	MATCHED
Same transaction ID multiple times	DUPLICATE
Reference match with small amount variance	PARTIAL
No match found	UNMATCHED
📁 Sample Files

Included demo files:

demo.csv

demo2.csv

demo3.csv

big_demo.csv

Used to simulate real financial datasets.

🔐 Authentication Flow

User login via JWT

Protected APIs using middleware

Token stored in frontend localStorage

📡 API Overview
Auth
POST /api/auth/login
POST /api/auth/register

Upload & Mapping
POST /api/upload
GET  /api/jobs

Reconciliation
POST /api/reconcile/:jobId
GET  /api/results/:jobId


📡 API Documentation

This project includes a complete Postman collection for testing and exploring all backend APIs.

📂 Location
api-docs/Smart-Reconciliation-APIs.postman_collection.json

📥 How to use

Open Postman

Click Import

Select the Postman collection file from api-docs folder

Set Authorization token after login

Test all available APIs

📌 Covered APIs

Authentication (Login/Register)

CSV Upload & Column Mapping

Upload Job History

Reconciliation Results

Dashboard Analytics

Audit Trail

Dashboard
GET /api/dashboard/stats

Audit
GET /api/audit/:recordId

🚀 How to Run
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev


Make sure MongoDB is running.

📈 Demo Flow

Login

Upload CSV & map columns

Auto reconciliation starts

View dashboard analytics

Open reconciliation results

Perform manual correction

Observe audit timeline

🧠 Assumptions

Uploaded data follows financial transaction structure

Reconciliation runs per upload batch

CSV format used for simplicity

MongoDB used for flexible schema

⚖️ Trade-offs

CSV chosen instead of Excel for faster parsing

Real-time processing instead of background queues

MongoDB over SQL for quick prototyping

⚠️ Limitations

No user roles (admin/auditor) yet

Large file streaming optimization not implemented

No notification system

No cloud deployment

🛠 Tech Stack

React.js

Node.js

Express.js

MongoDB

JWT Auth

Recharts

CSV Parser

👨‍💻 Author

Madhan
Smart Reconciliation & Audit System – MERN Stack
