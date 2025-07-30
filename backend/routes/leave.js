// In-memory storage (shared from server.js)
let leaveRequests = [];
let users = []; // Add reference to users array

// Helper function
const generateId = () => Date.now();

// Initialize leave requests array AND users array
const initializeLeaveRequests = (leaveArray, usersArray) => {
  leaveRequests = leaveArray;
  users = usersArray; // Store reference to users for validation
};

// POST /api/leave/apply - Apply for leave (UPDATED with employee validation)
const applyForLeave = (req, res) => {
  try {
    const { employeeName, fromDate, toDate, reason } = req.body;

    // Validation
    if (!employeeName || !fromDate || !toDate || !reason) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required (employeeName, fromDate, toDate, reason)'
      });
    }

    // NEW: Check if employee exists in registered users
    const employeeExists = users.find(user => user.name === employeeName);
    if (!employeeExists) {
      return res.status(400).json({
        success: false,
        message: 'Employee not found. Only registered users can apply for leave.'
      });
    }

    // Date validation
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      });
    }

    if (from < today) {
      return res.status(400).json({
        success: false,
        message: 'From date cannot be in the past'
      });
    }

    if (to < from) {
      return res.status(400).json({
        success: false,
        message: 'To date cannot be earlier than from date'
      });
    }

    // Reason validation
    if (reason.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Reason must be at least 10 characters long'
      });
    }

    // Calculate days
    const diffTime = Math.abs(to - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // Create leave request (with employee email for better tracking)
    const newLeaveRequest = {
      id: generateId(),
      employeeName: employeeName.trim(),
      employeeEmail: employeeExists.email, // NEW: Add employee email
      employeeDepartment: employeeExists.department, // NEW: Add department
      fromDate,
      toDate,
      reason: reason.trim(),
      days: diffDays,
      status: 'Pending',
      appliedAt: new Date().toISOString(),
      appliedDate: new Date().toLocaleDateString()
    };

    leaveRequests.push(newLeaveRequest);

    res.status(201).json({
      success: true,
      message: 'Leave request submitted successfully',
      leaveRequest: newLeaveRequest
    });

    console.log(`🏖️ New leave request: ${newLeaveRequest.employeeName} (${diffDays} days)`);

  } catch (error) {
    console.error('Error submitting leave request:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// GET /api/leave/all - Admin fetches all leave requests
const getAllLeaveRequests = (req, res) => {
  try {
    // Optional status filtering
    const { status } = req.query;
    let filteredRequests = leaveRequests;

    if (status) {
      const validStatuses = ['Pending', 'Approved', 'Rejected'];
      if (validStatuses.includes(status)) {
        filteredRequests = leaveRequests.filter(req => req.status === status);
      }
    }

    // Calculate stats
    const stats = {
      total: leaveRequests.length,
      pending: leaveRequests.filter(req => req.status === 'Pending').length,
      approved: leaveRequests.filter(req => req.status === 'Approved').length,
      rejected: leaveRequests.filter(req => req.status === 'Rejected').length
    };

    res.json({
      success: true,
      count: filteredRequests.length,
      stats,
      leaveRequests: filteredRequests.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
    });

    console.log(`📋 Retrieved ${filteredRequests.length} leave requests`);

  } catch (error) {
    console.error('Error retrieving leave requests:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// PUT /:id/status - Update leave request status (MISSING FUNCTION - ADD THIS)
const updateLeaveStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['Pending', 'Approved', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
      });
    }

    // Find leave request
    const leaveRequestIndex = leaveRequests.findIndex(req => req.id == id);
    if (leaveRequestIndex === -1) {
      return res.status(404).json({ 
        success: false,
        message: 'Leave request not found' 
      });
    }

    // Update status
    leaveRequests[leaveRequestIndex].status = status;
    leaveRequests[leaveRequestIndex].updatedDate = new Date().toLocaleDateString();
    leaveRequests[leaveRequestIndex].updatedAt = new Date().toISOString();

    res.json({
      success: true,
      message: `Leave request ${status.toLowerCase()} successfully`,
      leaveRequest: leaveRequests[leaveRequestIndex]
    });

    console.log(`✅ Leave request ${id} updated to ${status}`);

  } catch (error) {
    console.error('Error updating leave status:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
};

// UPDATED MODULE EXPORTS - ADD updateLeaveStatus
module.exports = {
  initializeLeaveRequests,
  applyForLeave,
  getAllLeaveRequests,
  updateLeaveStatus  
};
