
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jwt';
import dotenv from 'dotenv';


dotenv.config();


const taskSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    completed:{
        type: Boolean,
        default: false,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },


});


const Task = mongoose.model('Task', taskSchema);

export default Task;