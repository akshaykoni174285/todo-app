import express from 'express';
import dotenv from 'dotenv';
import ConnectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'


// custom imports
import User from './models/User.js'
const app = express();
const Port  = 5000;
ConnectDB();

// middleware
app.use(express.json());

dotenv.config()

app.use(cors({ origin: 'https://localhost:3000'}));
app.use('/api/auth',authRoutes);





app.listen(Port, ()=>{
    console.log('server running on port '+Port);
})