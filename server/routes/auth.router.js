import express from 'express'
import { logOut, signin, signup } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.get("/logout",logOut);
export default router;