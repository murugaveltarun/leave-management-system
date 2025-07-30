const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data storage
let users = [];
let leaveRequests = [];

// Import route handlers 
const userRoutes = require('./routes/users');
const leaveRoutes = require('./routes/leave');

// Initialize routes with shared data
userRoutes.initializeUsers(users);
leaveRoutes.initializeLeaveRequests(leaveRequests, users); // UPDATED: Pass both arrays

// API Documentation endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Leave Management API',
    version: '1.0.0',
    endpoints: {
      users: {
        'POST /users': 'Register a user',
        'GET /users': 'Get all registered users'
      },
      leave: {
        'POST /api/leave/apply': 'Apply for leave (Only registered users)',
        'GET /api/leave/all': 'Get all leave requests (Admin)'
      }
    },
    stats: {
      totalUsers: users.length,
      totalLeaveRequests: leaveRequests.length
    }
  });
});

// ===== ROUTE DEFINITIONS =====

app.post('/users', userRoutes.registerUser);

app.get('/users', userRoutes.getAllUsers);

app.post('/api/leave/apply', leaveRoutes.applyForLeave);

app.get('/api/leave/all', leaveRoutes.getAllLeaveRequests);

app.put('/api/leave/:id/status', leaveRoutes.updateLeaveStatus);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}`);
  console.log(`👥 Users endpoint: http://localhost:${PORT}/users`);
  console.log(`🏖️ Leave endpoint: http://localhost:${PORT}/api/leave/all`);
  console.log(`🔗 Employee validation: Only registered users can apply for leave`);
});
