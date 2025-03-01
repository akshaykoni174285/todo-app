import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const authMiddleware = (req, res, next)=>{


    const authHeader = req.header('Authorization');

    if(!authHeader){
        return res.status(401).json({message: 'Invalid authorization header'})


    }
    const token = authHeader.replace('Bearer','').trim();

    console.log('Auth Middleware - Received Token:', token);

    // const token = req.header('Authorization')?.replace('Bearer ','')

    // console.log(token)
    // if(!token){
    //     return res.status(401).json({message:'Access Denied. No token provided'});

    // }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("found the user id")
        console.log(decoded)
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token.' });

    }
}

export default authMiddleware;