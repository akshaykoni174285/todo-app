import express from 'express';
import dotenv from 'dotenv';
import ConnectDB from './config/db.js'


dotenv.config()

const Port  = process.env.PORT || 3000;


const app = express();
ConnectDB();

app.listen(Port, ()=>{
    console.log('server running on port '+Port);
})