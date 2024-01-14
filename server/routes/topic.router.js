import express from 'express'
import { createTopic, getTopics } from '../controller/topic.controller.js';
import upload from '../middleware/uploadImage.js'
const router = express.Router()

router.post("/create",upload.single('imageUrl'),createTopic);
router.get("/findall",getTopics);

export default router;