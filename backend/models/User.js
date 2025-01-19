import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

// Define user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
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

// Pre-save middleware to hash the password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Static method to hash a password
userSchema.statics.getHashedPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// Instance method to generate a JWT token and store it in the database
userSchema.methods.generateAuthToken = async function () {
  const payload = {
    userId: this._id,
    email: this.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '5h',
  });
  if (this.tokens.length >= 3) {
    // Optionally, delete the oldest token if limit is reached
    this.tokens.shift(); // Remove the first (oldest) token
  }

  // Save token to the tokens array
  this.tokens.push({ token });
  await this.save();

  return token;
};

export default mongoose.model('User', userSchema);
