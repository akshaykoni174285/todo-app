import User from '../models/User.js';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    console.log('Login attempt with email:', email);

    // Log the password received from request body
    console.log('Received password:', password);

    const user = await User.findByCredentials(email, password);
    
    if (!user) {
      console.log('No user found for email:', email);
      return res.status(400).json({ message: 'No user found, please sign up' });
    }

    const token = await user.generateAuthToken();
    console.log('Generated Token:', token);

    res.status(200).json({
      message: 'Login Successful',
      token,
    });

  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

  
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User is already registered' });
    }
    const user = new User({ name, email, password });

    // Hash the password
    // const hashedPassword = await User.getHashedPassword(password);

    // Create the user
    // const user = new User({
    //   name,
    //   email,
    //   password: hashedPassword,
    // });

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
