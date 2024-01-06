import User from "../model/user.model.js";

export const getUsers = async(req,res,next)=>{
    try {
        const users = await User.find();
        res.status(201).json(users);
    } catch (error) {
        next(error);
    }
}