import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Instead of bcrypt
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tasks:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  }],
  password: { type: String, required: true },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  // Log the password before hashing
  console.log('Hashing password:', this.password);
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
  // Log the hashed password
  console.log('Hashed password:', this.password);
  
  next();
});

// Static method to find a user by email and compare password
userSchema.statics.findByCredentials = async function (email, password) {
  try {
    console.log('Attempting to find user with email:', email);

    const user = await this.findOne({ email });

    if (!user) {
      console.log('No user found for email:', email);
      throw new Error('Unable to login: User not found');
    }

    
    console.log('User found:', user);
    const isMatch = await bcrypt.compare(password, user.password);
    
    console.log('Password match status:', isMatch);

    if (!isMatch) {
      console.log('Incorrect password for email:', email);
      return null; 
    }


    return user;
  } catch (error) {
    console.error('Error in findByCredentials:', error.message);
    throw error;
  }
};

// Static method to hash a password
userSchema.statics.getHashedPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// Instance method to generate a JWT token
userSchema.methods.generateAuthToken = async function () {
  const payload = {
    userId: this._id,
    email: this.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '5h',
  });

  if (this.tokens.length >= 3) {
    this.tokens.shift(); // Remove the first (oldest) token
  }

  // Add new token to the user's token array
  this.tokens.push({ token });
  await this.save();

  return token;
};

const User = mongoose.model('User', userSchema);

export default User;
