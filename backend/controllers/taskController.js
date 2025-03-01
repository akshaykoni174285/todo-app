
import Task from '../models/Task.js';
import User from '../models/User.js';


export const addTask = async(req,res) =>{
       try {
        const {title}  = req.body;
        const userId = req.user.userId;

        console.log(userId)
        console.log("well the guy who has lost everything")
        if(!title){
            return res.status(400).json({message:"Task title is required"});

        }
        const newTask = new Task({
            user: userId,
            title,

        });
        await newTask.save();
        res.status(201).json(newTask)

        // pushing the task in the user task list

        await User.findByIdAndUpdate(userId,{$push:{tasks:newTask._id}})

        
       } catch (error) {
        res.status(501).json({message: error});

        
       } 

}

export const tasks = async (req, res)=>{
    const user = req.user.userId;
    console.log(user)

    const usertasks = await User.findById(user).populate('tasks');
    const tasks = usertasks.tasks;
    res.send({tasks}).status(200);
}