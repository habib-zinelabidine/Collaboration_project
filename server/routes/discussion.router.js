import express from 'express'
import { createDiscussion, getDiscussion, getUserDiscussion } from '../controller/discussion.controller.js';

const router = express.Router();

router.get("/:topicId",getDiscussion);
router.post("/",createDiscussion);
router.get("/user/:senderId",getUserDiscussion);

export default router;