import express from 'express'
import { createTopic, getTopics } from '../controller/topic.controller.js';

const router = express.Router()

router.post("/create",createTopic);
router.get("/findall",getTopics);

export default router;