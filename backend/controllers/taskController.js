

import Task from '../models/Task';


export const addTask = async(req,res) =>{
       try {
        const { title } = req.body;

        if(!title){
            return res.status(400).json({message:"Task title is required"});
            
        }
        
       } catch (error) {
        res.status(500).json({message: "server error"});

        
       } 

}