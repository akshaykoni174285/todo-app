import express from 'express';
import User from '../models/User.js';
import {loginUser, registerUser} from '../controllers/authController.js';

const router = express.Router();

// Login Route
router.post('/login', loginUser);

// Register Route
router.post('/register', registerUser);

export default router;
