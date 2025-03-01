
import Task from '../models/Task.js';


export const addTask = async(req,res) =>{
       try {
        const { title } = req.body;
        const userId = req.body.id;


        if(!title){
            return res.status(400).json({message:"Task title is required"});

        }
        const newTask = new Task({
            user: userId,
            title,

        });
        await newTask.save();
        res.status(201).json(newTask)

        
       } catch (error) {
        res.status(501).json({message: "error"});

        
       } 

}