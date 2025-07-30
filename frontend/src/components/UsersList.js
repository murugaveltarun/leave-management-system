import React from 'react';
import './UsersList.css';

function UsersList({ users }) {
  // Helper function to get department CSS class
  const getDepartmentClass = (department) => {
    switch (department) {
      case 'Developer':
        return 'dept-developer';
      case 'Designing':
        return 'dept-designing';
      case 'Sales & Marketing':
        return 'dept-sales';
      case 'HR':
        return 'dept-hr';
      default:
        return 'dept-default';
    }
  };

  return (
    <div className="users-container">
      <h2 className="users-title">Registered Users</h2>
      
      {users.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-title">
            No users registered yet.
          </p>
          <p className="empty-state-subtitle">
            Go to the Register page to add your first user!
          </p>
        </div>
      ) : (
        <div className="users-table-section">
          <p className="user-count">
            Total Users: <strong>{users.length}</strong>
          </p>
          
          <table className="users-table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">
                  Name
                </th>
                <th className="table-header-cell">
                  Email
                </th>
                <th className="table-header-cell">
                  Department
                </th>
                <th className="table-header-cell center">
                  Registration Date
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="table-row">
                  <td className="table-cell">
                    {user.name}
                  </td>
                  <td className="table-cell">
                    {user.email}
                  </td>
                  <td className="table-cell">
                    <span className={`department-badge ${getDepartmentClass(user.department)}`}>
                      {user.department}
                    </span>
                  </td>
                  <td className="table-cell center">
                    <span className="registration-date">
                      {/* Handle backend date format properly */}
                      {user.registeredAt 
                        ? new Date(user.registeredAt).toLocaleDateString()
                        : new Date(user.id).toLocaleDateString()
                      }
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UsersList;
