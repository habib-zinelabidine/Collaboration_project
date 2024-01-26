import express from 'express'
import { createTopic, getTopicMembers, getTopics, updateTopics } from '../controller/topic.controller.js';
import upload from '../middleware/uploadImage.js'
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router()

router.post("/create/:userId",verifyToken,upload.single('imageUrl'),createTopic);
router.get("/findall",verifyToken,getTopics);
router.get("/getmembers/:topicId",verifyToken,getTopicMembers);
router.patch("/update/:id",verifyToken,updateTopics);

export default router;