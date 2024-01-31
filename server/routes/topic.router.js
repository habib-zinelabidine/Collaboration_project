import express from 'express'
import { createTopic, deleteTopic, getTopic, getTopicMembers, getTopics, updateTopics } from '../controller/topic.controller.js';
import upload from '../middleware/uploadImage.js'
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router()

router.post("/create/:createrId",verifyToken,upload.single('imageUrl'),createTopic);
router.get("/findall",verifyToken,getTopics);
router.get("/:id",verifyToken,getTopic);
router.get("/getmembers/:topicId",verifyToken,getTopicMembers);
router.patch("/update/:id",upload.single('imageUrl'),verifyToken,updateTopics);
router.delete("/delete/:topicId",verifyToken,deleteTopic);


export default router;