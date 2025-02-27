import express from 'express';
// import Task from '../models/Task.js';
import authMiddleware from '../middleware/authMiddleware.js';

import { addTask } from '../controllers/taskController.js';


const router = express.Router();


router.post('/addtask',authMiddleware, addTask)



export default router;