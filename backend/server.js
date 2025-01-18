import express from 'express';
import dotenv from 'dotenv';
import ConnectDB from './config/db.js'

// custom imports 
import User from './models/User.js'
const app = express();
const Port  = process.env.PORT || 3000;
ConnectDB();

// middleware
app.use(express.json());

dotenv.config()

app.post('/private/users',auth,async (req, res)=>{
    try {
        // when hitting the api pass the data in the body
        const user = new User(req.body);
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({message: err.message});
        
    }
})

app.post('/login',async (req, res)=>{
    try {
        // when hitting the api pass the data in the body
        const user = new User(req.body);
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({message: err.message});
        
    }
})





app.listen(Port, ()=>{
    console.log('server running on port '+Port);
})