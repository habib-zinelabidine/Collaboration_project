import express from 'express'
import { createTopic, getTopics, updateTopics } from '../controller/topic.controller.js';
import upload from '../middleware/uploadImage.js'
const router = express.Router()

router.post("/create",upload.single('imageUrl'),createTopic);
router.get("/findall",getTopics);
router.patch("/update/:id",updateTopics);

export default router;