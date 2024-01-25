import express from 'express'
import { createTopic, getTopics, updateTopics } from '../controller/topic.controller.js';
import upload from '../middleware/uploadImage.js'
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router()

router.post("/create",verifyToken,upload.single('imageUrl'),createTopic);
router.get("/findall",verifyToken,getTopics);
router.patch("/update/:id",verifyToken,updateTopics);

export default router;