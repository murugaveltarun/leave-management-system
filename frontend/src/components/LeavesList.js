import React, { useState } from 'react';
import './LeavesList.css';

function LeavesList({ leaveRequests, setLeaveRequests, updateLeaveStatus }) {
  // Loading state for API calls
  const [updatingStatus, setUpdatingStatus] = useState({});

  // Function to update leave status with API integration
  const handleUpdateLeaveStatus = async (id, newStatus) => {
    // Set loading state for this specific request
    setUpdatingStatus(prev => ({ ...prev, [id]: true }));

    try {
      // Call the API function passed from App.js
      const result = await updateLeaveStatus(id, newStatus);

      if (result.success) {
        // Success message (optional - you can remove this if you prefer silent updates)
        console.log(`Leave request ${newStatus.toLowerCase()} successfully`);
      } else {
        // Show error message from backend
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error updating leave status:', error);
      alert('Failed to update leave status. Please try again.');
    } finally {
      // Clear loading state
      setUpdatingStatus(prev => ({ ...prev, [id]: false }));
    }
  };

  // Helper function to get status CSS class
  const getStatusClass = (status) => {
    return status.toLowerCase();
  };

  return (
    <div className="leaves-container">
      <h2 className="leaves-title">Leave Requests Management</h2>
      
      {leaveRequests.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-title">
            No leave requests submitted yet.
          </p>
          <p className="empty-state-subtitle">
            Go to Apply Leave page to submit your first request!
          </p>
        </div>
      ) : (
        <div className="leaves-content">
          {/* Summary Stats */}
          <div className="stats-container">
            <div className="stat-card pending">
              <h4 className="stat-title pending">Pending</h4>
              <span className="stat-number pending">
                {leaveRequests.filter(req => req.status === 'Pending').length}
              </span>
            </div>
            <div className="stat-card approved">
              <h4 className="stat-title approved">Approved</h4>
              <span className="stat-number approved">
                {leaveRequests.filter(req => req.status === 'Approved').length}
              </span>
            </div>
            <div className="stat-card rejected">
              <h4 className="stat-title rejected">Rejected</h4>
              <span className="stat-number rejected">
                {leaveRequests.filter(req => req.status === 'Rejected').length}
              </span>
            </div>
          </div>

          {/* Leave Requests Table */}
          <div className="table-container">
            <table className="leaves-table">
              <thead className="table-header">
                <tr>
                  <th className="table-header-cell">Employee</th>
                  <th className="table-header-cell">From Date</th>
                  <th className="table-header-cell">To Date</th>
                  <th className="table-header-cell center">Days</th>
                  <th className="table-header-cell">Reason</th>
                  <th className="table-header-cell center">Status</th>
                  <th className="table-header-cell center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request, index) => (
                  <tr key={request.id} className="table-row">
                    <td className="table-cell">
                      <div className="employee-info">{request.employeeName}</div>
                      <div className="applied-date">
                        Applied: {request.appliedDate}
                      </div>
                    </td>
                    <td className="table-cell">
                      {new Date(request.fromDate).toLocaleDateString()}
                    </td>
                    <td className="table-cell">
                      {new Date(request.toDate).toLocaleDateString()}
                    </td>
                    <td className="table-cell center">
                      <span className="days-badge">
                        {request.days}
                      </span>
                    </td>
                    <td className="table-cell reason">
                      <div className="reason-text">
                        {request.reason}
                      </div>
                    </td>
                    <td className="table-cell center">
                      <span className={`status-badge ${getStatusClass(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="table-cell center">
                      {request.status === 'Pending' ? (
                        <div className="actions-container">
                          <button
                            onClick={() => handleUpdateLeaveStatus(request.id, 'Approved')}
                            className="action-button approve"
                            disabled={updatingStatus[request.id]}
                          >
                            {updatingStatus[request.id] ? 'Approving...' : 'Approve'}
                          </button>
                          <button
                            onClick={() => handleUpdateLeaveStatus(request.id, 'Rejected')}
                            className="action-button reject"
                            disabled={updatingStatus[request.id]}
                          >
                            {updatingStatus[request.id] ? 'Rejecting...' : 'Reject'}
                          </button>
                        </div>
                      ) : (
                        <div className="status-info">
                          {request.status}
                          {request.updatedDate && (
                            <><br />on {request.updatedDate}</>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeavesList;
