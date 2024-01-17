import MessageModel from "../model/MessageModel.js";

export const addMessage = async (req, res) => {
  const { senderId,receiverId, text } = req.body;
  const message = new MessageModel({
    senderId,
    receiverId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMessages = async (req, res) => {
  const { senderId,receiverId } = req.params;
  try {
    const result = await MessageModel.find({ senderId,receiverId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
