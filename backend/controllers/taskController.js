
import Task from '../models/Task.js';


export const addTask = async(req,res) =>{
       try {
        const { title } = req.body;

        if(!title){
            return res.status(400).json({message:"Task title is required"});

        }
        const newTask = new Task({
            user: req.user.userId,
            title,

        });
        await newTask.save();
        res.status(201).json(newTask)

        
       } catch (error) {
        res.status(501).json({message: "error"});

        
       } 

}