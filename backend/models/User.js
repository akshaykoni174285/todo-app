import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const userSchema = new mongoose.Schema({
    name: {type: String,required: true},
    email:{type: String,required: true},
    password:{type: String,required: true}
});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

  userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // Static method to generate JWT token
  userSchema.methods.generateAuthToken = function () {
    const payload = {
      userId: this._id,
      email: this.email,
    };
  
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  
    return token;
  };


export default mongoose.model('User',userSchema);