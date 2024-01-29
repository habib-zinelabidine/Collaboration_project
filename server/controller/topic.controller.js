import Topic from "../model/Topic.model.js";
import dotenv from "dotenv";
dotenv.config();

export const createTopic = async (req, res, next) => {
  const {createrId} = req.params
  try {
    let topic = new Topic({
      topicName: req.body.topicName,
      description: req.body.description,
      members : [createrId],
      createrId : createrId

    });
    if (req.file) {
      topic.imageUrl =
        process.env.baseUrl + process.env.PORT + "/" + req.file.path;
    }
    topic
      .save()
      .then((response) => {
        res.status(201).json(topic);
      })
      .catch((error) => {
        res.json({ error });
      });
  } catch (error) {
    next(error);
  }
};
export const getTopics = async (req, res, next) => {
  try {
    const topic = await Topic.find();
    res.status(200).json(topic);
  } catch (error) {
    next(error);
  }
};
export const updateTopics = async (req, res, next) => {
  
  try {
    let updateFields = {
      topicName: req.body.topicName,
      description: req.body.description,
    };
    if (req.file) {
      updateFields.imageUrl =
        process.env.baseUrl + process.env.PORT + "/" + req.file.path;
    }

    if (req.body.members && req.body.members.length > 0) {
      updateFields.members = { $each: req.body.members };
    }

    const updateTopic = await Topic.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: updateFields.members ? updateFields.members : {},
        $set: updateFields,
      },
      { new: true }
    );

    if (!updateTopic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    res.status(200).json(updateTopic);
  } catch (error) {
    next(error);
  }
};
export const getTopicMembers = async(req,res,next)=>{
  const {topicId} = req.params
  try {
    const topicMembers = await Topic.findById(topicId).populate("members");
    res.status(200).json(topicMembers)
  } catch (error) {
    next(error)
  }
}

export const deleteTopic = async(req,res,next)=>{
try {
  const  deletedTopic=await Topic.findByIdAndDelete(req.params.topicId);
  res.status(200).json("topic deleted successfully!");
} catch (error) {
  next(error);
}
}