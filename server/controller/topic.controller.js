import Topic from "../model/Topic.model.js";
import User from "../model/user.model.js";

export const createTopic = async (req, res, next) => {
  try {
    let topic = new Topic({
      topicName: req.body.topicName,
      description: req.body.description,
    });
    if (req.file) {
      topic.imageUrl = req.file.path;
    }
    topic
      .save()
      .then((response) => {
        res.json(topic);
      })
      .catch((error) => {
        res.json({error});
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
