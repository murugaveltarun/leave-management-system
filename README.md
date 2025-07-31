[LIVE DEMO](https://leave-management-system-frontend-vicj.onrender.com/)

# 🏢 Leave Management System

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</p>

<p align="center">
  <b>A comprehensive full-stack MERN application for employee leave management</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/Version-1.0.0-orange?style=flat-square" alt="Version" />
</p>

---

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Features](#-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🔌 API Endpoints](#-api-endpoints)
- [💡 Key Implementation Details](#-key-implementation-details)
- [🎨 Frontend Components](#-frontend-components)
- [🌐 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)

---

## 🎯 Project Overview

The **Leave Management System** is a modern, responsive web application built using the MERN stack (excluding database integration as per requirements). This project demonstrates professional full-stack development skills and implements real-world business logic for managing employee leave requests.

### Why This Project Matters

- **Professional Architecture**: Clean separation of frontend and backend with proper API design
- **Real-World Business Logic**: Only registered employees can apply for leave, enforcing proper workflow
- **Modern UI/UX**: Responsive design with professional styling and user feedback
- **Complete CRUD Operations**: Full create, read, update functionality with proper validation
- **Industry Standards**: Following best practices for React.js and Express.js development

---

## ✨ Features

### 🔐 User Management
- **Secure Registration**: Input validation with department assignment
- **Professional Form Design**: Clean, responsive registration forms
- **Department Validation**: Only allows specific departments (Developer, Designing, Sales & Marketing, HR)
- **Duplicate Prevention**: Prevents registration with existing email addresses

### 📝 Leave Application System
- **Restricted Access**: Only registered users can apply for leave
- **Smart Form Validation**: 
  - Date validation (prevents past dates)
  - Minimum reason length requirement
  - Automatic days calculation
- **User Dropdown**: Select from registered employees (no manual typing)
- **Real-time Feedback**: Loading states and success/error messages

### 👨‍💼 Administrative Features
- **Dashboard Overview**: Statistics showing pending, approved, and rejected requests
- **Request Management**: Approve or reject leave requests with one click
- **Status Tracking**: Automatic timestamps for all status changes
- **Professional Table Design**: Clean, sortable display of all requests

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Loading States**: Professional loading indicators during API calls
- **Error Handling**: Comprehensive error messages and user guidance
- **Intuitive Navigation**: Clean routing between different sections

---

## 🛠️ Technologies Used

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Backend-Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Runtime-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
</p>

### Frontend Technologies

| Technology        | Purpose        | Features                                  |
|-------------------|----------------|-------------------------------------------|
| **React.js**      | UI Framework   | Component-based, hooks, state management  |
| **React Router**  | Navigation     | Client-side routing                       |
| **CSS3**          | Styling        | Responsive design, animations             |
| **JavaScript ES6+** | Logic         | Modern syntax, async/await                |

### Backend Technologies

| Technology        | Purpose           | Features                                 |
|-------------------|-------------------|------------------------------------------|
| **Node.js**       | Runtime Environment | V8 engine, non-blocking I/O             |
| **Express.js**    | Web Framework     | RESTful APIs, middleware                 |
| **CORS**          | Cross-Origin Support | Frontend-backend communication         |
| **In-Memory Storage** | Data Storage | Arrays for users and leave requests      |

### Development Tools

- **Nodemon** - Auto-restart during development
- **Git** - Version control
- **npm** - Package management

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or above) - [Download here](https://nodejs.org/)
- npm (comes with Node.js)
- Git - [Download here](https://git-scm.com/)

### Installation Steps

```bash
# 1. Clone the Repository
git clone https://github.com/yourusername/leave-management-system.git
cd leave-management-system

# 2. Install Backend Dependencies
cd backend
npm install

# 3. Install Frontend Dependencies
cd ../frontend
npm install
```

### Running the Application

```bash
# Start Backend Server
cd backend
npm run dev
# ✅ Runs on http://localhost:5000

# Start Frontend Server
cd ../frontend
npm start
# ✅ Runs on http://localhost:3000
```

### Quick Test

1. Visit `http://localhost:3000`
2. Register a user
3. Apply for leave
4. Manage leave requests

---

## 📁 Project Structure

```
leave-management-system/
├── backend/
│   ├── routes/
│   │   ├── users.js        # User registration & retrieval
│   │   └── leave.js        # Leave management routes
│   ├── server.js           # Entry point
│   ├── package.json
│   └── node_modules/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js
│   │   │   ├── UserForm.js
│   │   │   ├── UsersList.js
│   │   │   ├── LeaveForm.js
│   │   │   └── LeavesList.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── node_modules/
├── README.md
└── .gitignore
```

---

## 🔌 API Endpoints

### User Management

| Method | Endpoint    | Description           |
|--------|-------------|-----------------------|
| POST   | `/users`    | Register new user     |
| GET    | `/users`    | Get all users         |

### Leave Management

| Method | Endpoint                 | Description                 |
|--------|--------------------------|-----------------------------|
| POST   | `/api/leave/apply`       | Submit a leave request      |
| GET    | `/api/leave/all`         | Retrieve all leave requests |
| PUT    | `/api/leave/:id/status`  | Update status (approve/reject) |

### Example Requests

```json
// Register User
POST /users
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "department": "Developer"
}

// Apply Leave
POST /api/leave/apply
{
  "employeeName": "John Doe",
  "fromDate": "2025-08-01",
  "toDate": "2025-08-05",
  "reason": "Family vacation"
}
```

---

## 💡 Key Implementation Details

### 🔒 Security & Validation

- Backend input validation
- Registered-user-only leave application
- Date range checks (no past dates)
- Sanitized inputs

### 🔄 Data Flow

1. User registers → stored in-memory
2. Leave form populated from registered users
3. Admin actions update status → UI updates in real-time

### 🎯 Business Logic

- Link leave requests to users
- Status: Pending → Approved/Rejected
- Timestamps for status updates
- Auto days calculation

---

## 🎨 Frontend Components

| Component       | Purpose              | Key Features                       |
|------------------|-----------------------|------------------------------------|
| **Home**         | Landing page          | Feature overview                   |
| **UserForm**     | Registration          | Validation, department selection   |
| **UsersList**    | Display all users     | Responsive table UI                |
| **LeaveForm**    | Leave application     | Validation, dropdown selection     |
| **LeavesList**   | Admin management      | Approve/reject, status updates     |

### Styling Approach

- **Modular CSS** per component
- **Responsive Design** with breakpoints
- **Clean UI**: forms, tables, buttons
- **User Feedback**: loading, error/success alerts

---


## 🤝 Contributing

We welcome contributions!

### Steps

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m 'Add feature'`
4. Push: `git push origin feature/your-feature`
5. Open Pull Request

### Guidelines

- Follow code style
- Comment complex logic
- Test features
- Update docs if needed

---

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Built%20for-Learning-blue?style=for-the-badge" />
</p>

<p align="center">
  <b>🌟 If you found this project helpful, please give it a star! 🌟</b>
</p>

<p align="center">
  Built with passion for learning and professional development<br>
</p>
