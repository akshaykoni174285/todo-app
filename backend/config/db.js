
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Adjust the path if needed



export default async function(){
    // this had to be a async function
    console.log('mongo url',process.env.MONGO_URI)
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            // userUnifiedTopology: true
        })
        console.log("MongoDB Connected Successfully!")
        
    } catch (error) {
        console.log("error in connecting to MongoDB:",error.message);
        process.exit(1);
    }
};

