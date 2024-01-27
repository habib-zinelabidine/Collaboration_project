import express from 'express'
import { createDiscussion, getDiscussion, getUserDiscussion } from '../controller/discussion.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import upload from '../middleware/uploadImage.js'


const router = express.Router();

router.get("/:topicId",verifyToken,getDiscussion);
router.post("/",upload.single('message'),verifyToken,createDiscussion);
router.get("/user/:senderId",verifyToken,getUserDiscussion);

export default router;