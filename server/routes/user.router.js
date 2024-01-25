import express from 'express'
import { getUser, getUsers, updateUser } from '../controller/user.controller.js';
import upload from '../middleware/uploadImage.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get("/users",verifyToken,getUsers);
router.get("/:userId",verifyToken,getUser);
router.patch("/update/:id",verifyToken,upload.single('avatar'),updateUser);

export default router;