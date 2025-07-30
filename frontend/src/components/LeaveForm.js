import React, { useState } from "react";
import "./LeaveForm.css";

function LeaveForm({ leaveRequests, setLeaveRequests, submitLeaveRequest, users }) {
  // Form state
  const [formData, setFormData] = useState({
    employeeName: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  // Error state for validation
  const [errors, setErrors] = useState({});
  
  // Loading state for API calls
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Employee name validation
    if (!formData.employeeName.trim()) {
      newErrors.employeeName = "Please select an employee";
    }

    // From date validation
    if (!formData.fromDate) {
      newErrors.fromDate = "From date is required";
    }

    // To date validation
    if (!formData.toDate) {
      newErrors.toDate = "To date is required";
    } else if (formData.fromDate && formData.toDate < formData.fromDate) {
      newErrors.toDate = "To date cannot be earlier than from date";
    }

    // Reason validation
    if (!formData.reason.trim()) {
      newErrors.reason = "Reason for leave is required";
    } else if (formData.reason.trim().length < 10) {
      newErrors.reason = "Reason must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate number of days
  const calculateDays = () => {
    if (formData.fromDate && formData.toDate) {
      const from = new Date(formData.fromDate);
      const to = new Date(formData.toDate);
      const diffTime = Math.abs(to - from);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  // Handle form submission with API integration
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Call the API function passed from App.js
        const result = await submitLeaveRequest(formData);

        if (result.success) {
          // Reset form on successful submission
          setFormData({
            employeeName: "",
            fromDate: "",
            toDate: "",
            reason: "",
          });

          // Clear any existing errors
          setErrors({});

          // Show success message
          alert("Leave request submitted successfully!");
        } else {
          // Show error message from backend
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error('Error submitting leave request:', error);
        alert('Failed to submit leave request. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Get character counter class
  const getCharacterCounterClass = () => {
    const length = formData.reason.length;
    if (length >= 10) return "character-counter valid";
    if (length > 0) return "character-counter invalid";
    return "character-counter";
  };

  return (
    <div className="leave-form-container">
      <h2 className="leave-form-title">Apply for Leave</h2>

      <form onSubmit={handleSubmit}>
        {/* Employee Name Dropdown - UPDATED */}
        <div className="form-group">
          <label className="form-label">Employee Name:</label>
          
          {users.length === 0 ? (
            // Show message when no users are registered
            <div className="no-users-message">
              <p style={{ 
                color: '#dc3545', 
                backgroundColor: '#f8d7da', 
                padding: '10px', 
                borderRadius: '4px',
                border: '1px solid #f5c6cb',
                margin: '5px 0'
              }}>
                No users registered yet. Please register users first before applying for leave.
              </p>
            </div>
          ) : (
            // Show dropdown when users are available
            <select
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              className={`form-input ${errors.employeeName ? "error" : ""}`}
              disabled={isSubmitting}
            >
              <option value="">Select Employee</option>
              {users.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name} ({user.department})
                </option>
              ))}
            </select>
          )}
          
          {errors.employeeName && (
            <span className="error-message">{errors.employeeName}</span>
          )}
        </div>

        {/* Date Fields Row */}
        <div className="date-fields-row">
          {/* From Date */}
          <div className="date-field">
            <label className="form-label">From Date:</label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className={`form-input ${errors.fromDate ? "error" : ""}`}
              disabled={isSubmitting || users.length === 0}
            />
            {errors.fromDate && (
              <span className="error-message">{errors.fromDate}</span>
            )}
          </div>

          {/* To Date */}
          <div className="date-field">
            <label className="form-label">To Date:</label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              min={formData.fromDate || new Date().toISOString().split("T")[0]}
              className={`form-input ${errors.toDate ? "error" : ""}`}
              disabled={isSubmitting || users.length === 0}
            />
            {errors.toDate && (
              <span className="error-message">{errors.toDate}</span>
            )}
          </div>
        </div>

        {/* Days calculation display */}
        {formData.fromDate && formData.toDate && calculateDays() > 0 && (
          <div className="days-display">
            <strong>Total Days: {calculateDays()}</strong>
          </div>
        )}

        {/* Reason Field */}
        <div className="form-group">
          <label className="form-label">Reason for Leave:</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="4"
            className={`form-textarea ${errors.reason ? "error" : ""}`}
            placeholder="Enter detailed reason for leave (minimum 10 characters)"
            disabled={isSubmitting || users.length === 0}
          />
          {errors.reason && (
            <span className="error-message">{errors.reason}</span>
          )}
          <small className={getCharacterCounterClass()}>
            {formData.reason.length}/10 characters minimum
          </small>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting || users.length === 0}
        >
          {isSubmitting ? "Submitting..." : "Submit Leave Request"}
        </button>
      </form>
    </div>
  );
}

export default LeaveForm;
