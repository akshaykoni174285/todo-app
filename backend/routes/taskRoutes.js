import express from 'express';
// import Task from '../models/Task.js';
import authMiddleware from '../middleware/authMiddleware.js';

import { addTask,tasks } from '../controllers/taskController.js';


const router = express.Router();


router.post('/addtask',authMiddleware, addTask)
router.get('/tasks',authMiddleware,tasks)



export default router;