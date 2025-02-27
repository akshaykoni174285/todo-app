import express from 'express';
import dotenv from 'dotenv';
import ConnectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

import cors from 'cors'


// custom imports
import User from './models/User.js'
const app = express();
const Port  = 5000;
ConnectDB();

// middleware
app.use(express.json());

dotenv.config()

app.use(cors());
app.use('/api/auth',authRoutes);
app.use('/dashboard',taskRoutes);


app.get('/api/users',async (req,res) => {
    const {email,password} = req.body;

    const user = await User.find({});
    console.log(user)
    res.send(user)
})




app.listen(Port, ()=>{
    console.log('server running on port '+Port);
})