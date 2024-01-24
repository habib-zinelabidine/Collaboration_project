import express from 'express'
import { getUser, getUsers, updateUser } from '../controller/user.controller.js';
import upload from '../middleware/uploadImage.js';

const router = express.Router();

router.get("/users",getUsers);
router.get("/:userId",getUser);
router.patch("/update/:id",upload.single('avatar'),updateUser);

export default router;