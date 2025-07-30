// In-memory storage (shared from server.js)
let users = [];

// Helper function
const generateId = () => Date.now();

// Initialize users array
const initializeUsers = (usersArray) => {
  users = usersArray;
};

// POST /users - Register a user
const registerUser = (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    // Validation
    if (!name || !email || !password || !department) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required (name, email, password, department)'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Valid departments
    const validDepartments = ['Developer', 'Designing', 'Sales & Marketing', 'HR'];
    if (!validDepartments.includes(department)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid department. Must be one of: ' + validDepartments.join(', ')
      });
    }

    // Create new user
    const newUser = {
      id: generateId(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password, // In production, hash this!
      department,
      registeredAt: new Date().toISOString()
    };

    users.push(newUser);

    // Return without password
    const { password: _, ...userResponse } = newUser;
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: userResponse
    });

    console.log(`✅ New user registered: ${newUser.name} (${newUser.email})`);

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// GET /users - Get all registered users
const getAllUsers = (req, res) => {
  try {
    // Return users without passwords
    const usersResponse = users.map(({ password, ...user }) => user);
    
    res.json({
      success: true,
      count: users.length,
      users: usersResponse
    });

    console.log(`📋 Retrieved ${users.length} users`);

  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  initializeUsers,
  registerUser,
  getAllUsers
};
