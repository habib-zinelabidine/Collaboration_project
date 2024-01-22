import Discussion from "../model/Discussion.js";
import User from "../model/user.model.js";

export const getDiscussion = async(req,res,next)=>{
    try {
        const topicId = req.params.topicId;
        const discussion = await Discussion.find({ topicId });
        res.status(200).json(discussion);
    } catch (error) {
        next(error);
    }
}
export const createDiscussion = async(req,res,next)=>{
    const {senderId,topicId,message} = req.body;
    const discussion = new Discussion({
        senderId,topicId,message
    })
    try {
        const result = await discussion.save();
        res.status(201).json(result);
    } catch (error) {
        next(error)
    }
}
export const getUserDiscussion = async(req,res,next)=>{
    const {senderId} = req.params;
    try {
        const user = await Discussion.findOne({senderId})
        const userId = await User.findOne(user.senderId);
        res.status(200).json(userId)
    } catch (error) {
        next(error)
    }
}