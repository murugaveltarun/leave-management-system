# 🏢 Leave Management System

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB (Concept)" />
</p>

<p align="center">
  <b>A comprehensive full-stack MERN application for employee leave management</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License" />
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
- [📄 License](#-license)

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
| Technology | Purpose | Features |
|------------|---------|----------|
| **React.js** | UI Framework | Component-based architecture, hooks, state management |
| **React Router** | Navigation | Client-side routing, dynamic navigation |
| **CSS3** | Styling | Responsive design, modern layouts, animations |
| **JavaScript ES6+** | Logic | Modern syntax, async/await, arrow functions |

### Backend Technologies
| Technology | Purpose | Features |
|------------|---------|----------|
| **Node.js** | Runtime Environment | V8 engine, non-blocking I/O |
| **Express.js** | Web Framework | RESTful APIs, middleware, routing |
| **CORS** | Cross-Origin Support | Frontend-backend communication |
| **In-Memory Storage** | Data Storage | Arrays for users and leave requests |

### Development Tools
- **Nodemon** - Auto-restart server during development
- **Git** - Version control and collaboration
- **npm** - Package management

---

## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)

### Installation Steps

1. **Clone the Repository**
