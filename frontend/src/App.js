import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import UserForm from './components/UserForm';
import UsersList from './components/UsersList';
import LeaveForm from './components/LeaveForm';
import LeavesList from './components/LeavesList';
import './App.css';

// API base URL
const API_BASE_URL = 'https://leave-management-system-backend-xy4j.onrender.com';

function App() {
  // State management with backend integration
  const [users, setUsers] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);

  // Fetch initial data from backend when app loads
  useEffect(() => {
    fetchUsers();
    fetchLeaveRequests();
  }, []);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.users);
      } else {
        console.error('Failed to fetch users:', data.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch leave requests from backend
  const fetchLeaveRequests = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/leave/all`);
      const data = await response.json();
      
      if (data.success) {
        setLeaveRequests(data.leaveRequests);
      } else {
        console.error('Failed to fetch leave requests:', data.message);
      }
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  // Register new user via API
  const registerUser = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (data.success) {
        // Refresh users list
        await fetchUsers();
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Error registering user:', error);
      return { success: false, message: 'Failed to register user' };
    }
  };

  // Submit leave request via API
  const submitLeaveRequest = async (leaveData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/leave/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leaveData),
      });

      const data = await response.json();
      
      if (data.success) {
        // Refresh leave requests list
        await fetchLeaveRequests();
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Error submitting leave request:', error);
      return { success: false, message: 'Failed to submit leave request' };
    }
  };

  // Update leave request status via API (for admin actions)
  const updateLeaveStatus = async (leaveId, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/leave/${leaveId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Refresh leave requests list
        await fetchLeaveRequests();
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Error updating leave status:', error);
      return { success: false, message: 'Failed to update leave status' };
    }
  };

  return (
    <Router>
      <div className="App">
        {/* Navigation - keeping your existing CSS classes */}
        <nav className="nav-container">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/register" className="nav-link">Register</Link>
          <Link to="/users" className="nav-link">Users</Link>
          <Link to="/leave" className="nav-link">Apply Leave</Link>
          <Link to="/leaves" className="nav-link">View Leaves</Link>
        </nav>

        {/* Routes - Updated with API integration */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/register" 
              element={
                <UserForm 
                  users={users} 
                  setUsers={setUsers}
                  registerUser={registerUser}
                />
              } 
            />
            <Route 
              path="/users" 
              element={<UsersList users={users} />} 
            />
            <Route 
              path="/leave" 
              element={
                <LeaveForm 
                  leaveRequests={leaveRequests} 
                  setLeaveRequests={setLeaveRequests}
                  submitLeaveRequest={submitLeaveRequest}
                  users={users} 
                />
              } 
            />
            <Route 
              path="/leaves" 
              element={
                <LeavesList 
                  leaveRequests={leaveRequests} 
                  setLeaveRequests={setLeaveRequests}
                  updateLeaveStatus={updateLeaveStatus}
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
