import express from 'express'
import { createDiscussion, getDiscussion, getUserDiscussion } from '../controller/discussion.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get("/:topicId",verifyToken,getDiscussion);
router.post("/",verifyToken,createDiscussion);
router.get("/user/:senderId",verifyToken,getUserDiscussion);

export default router;