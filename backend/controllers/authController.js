import User from '../models/User.js';

// Login Controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('No user found, please sign up');
      return res.status(400).json({ message: 'No user found..' });
    }

    const ismatch = await user.comparePassword(password);
    
    if (!ismatch) {
      console.log('The password is wrong');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = user.generateAuthToken();
    res.status(200).json({
      message: 'Login Successful',
      token,
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Register Controller
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input for all fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User is already registered' });
    }

    // Hash the password
    const hashedPassword = await User.getHashedPassword(password);

    // Create the user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate a token
    const token = await user.generateAuthToken();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
