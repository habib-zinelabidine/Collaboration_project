import Topic from "../model/Topic.model.js";
import User from "../model/user.model.js";

export const createTopic = async(req,res,next)=>{
    try {
        const topic = await Topic.create(req.body);
        res.status(201).json(topic);
    } catch (error) {
        next(error);
    }
}
export const getTopics = async(req,res,next)=>{
    try {
        const topic = await Topic.find();
        res.status(200).json(topic);
    } catch (error) {
        next(error)
    }
}