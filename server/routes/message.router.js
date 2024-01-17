import express from 'express'
import { addMessage, getMessages } from '../controller/message.controller.js';

const router = express.Router();

router.post("/",addMessage);
router.get("/:senderId/:receiverId",getMessages);

export default router;