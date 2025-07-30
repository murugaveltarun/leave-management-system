import React, { useState } from 'react';
import './UserForm.css';

function UserForm({ users, setUsers, registerUser }) {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: ''
  });

  // Error state for validation
  const [errors, setErrors] = useState({});
  
  // Loading state for API calls
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Department options
  const departments = ['Developer', 'Designing', 'Sales & Marketing', 'HR'];

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  // Basic form validation
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Department validation
    if (!formData.department) {
      newErrors.department = 'Please select a department';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission with API integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Call the API function passed from App.js
        const result = await registerUser(formData);

        if (result.success) {
          // Reset form on successful registration
          setFormData({
            name: '',
            email: '',
            password: '',
            department: ''
          });

          // Clear any existing errors
          setErrors({});

          // Show success message
          alert('User registered successfully!');
        } else {
          // Show error message from backend
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error('Error registering user:', error);
        alert('Failed to register user. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">User Registration</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="form-group">
          <label className="form-label">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="Enter your name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <span className="error-message">
              {errors.name}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label className="form-label">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="Enter your email"
            disabled={isSubmitting}
          />
          {errors.email && (
            <span className="error-message">
              {errors.email}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label className="form-label">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`form-input ${errors.password ? 'error' : ''}`}
            placeholder="Enter your password"
            disabled={isSubmitting}
          />
          {errors.password && (
            <span className="error-message">
              {errors.password}
            </span>
          )}
        </div>

        {/* Department Dropdown */}
        <div className="form-group">
          <label className="form-label">
            Department:
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={`form-select ${errors.department ? 'error' : ''}`}
            disabled={isSubmitting}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && (
            <span className="error-message">
              {errors.department}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register User'}
        </button>
      </form>
    </div>
  );
}

export default UserForm;
