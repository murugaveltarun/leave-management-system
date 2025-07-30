import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Leave Management Portal</h1>
      <p className="home-description">
        Manage your employee registrations and leave requests efficiently.
      </p>
      <div className="features-section">
        <h3 className="features-title">Features:</h3>
        <ul className="features-list">
          <li>User Registration</li>
          <li>View Registered Users</li>
          <li>Apply for Leave</li>
          <li>Manage Leave Requests</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
