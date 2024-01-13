import Discussion from "../model/Discussion.js";

export const getDiscussion = async(req,res,next)=>{
    try {
        const topicId = req.params.topicId;
        const discussion = await Discussion.find({ topicId: topicId });
        res.status(200).json(discussion);
    } catch (error) {
        next(error);
    }
}