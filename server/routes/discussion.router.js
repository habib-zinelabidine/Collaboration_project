import express from 'express'
import { getDiscussion } from '../controller/discussion.controller.js';

const router = express.Router();

router.get("/:topicId",getDiscussion);

export default router;