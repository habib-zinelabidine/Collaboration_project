import express from 'express'
import { addMessage, getMessages } from '../controller/message.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/",verifyToken,addMessage);
router.get("/:senderId/:receiverId",verifyToken,getMessages);

export default router;