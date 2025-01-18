
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


export default async function(){
    // this had to be a async function

    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            userUnifiedTopology: true
        })
        console.log("MongoDB Connected Successfully!")
        
    } catch (error) {
        console.log("error in connecting to MongoDB:",error.message);
        process.exit(1);
    }
};

