import express from 'express'
import { uploadImage } from '../controller/image.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import upload from '../middleware/uploadImage.js'


const router = express.Router()

router.post("/upload",upload.single('imageUrl'),verifyToken,uploadImage);
export default router;