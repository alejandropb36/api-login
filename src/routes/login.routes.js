import { Router } from "express";
import { login, register, getProfile, logout } from '../controllers/login.controller.js';
import { registerValidate, loginValidate } from '../validators/user.validator.js';
import checkAuth from "../middlewares/auth.middleware.js";
const router = Router();

router.post('/login', loginValidate, login);
router.post('/register', registerValidate, register);
router.post('/profile', checkAuth, getProfile);
router.post('/logout', logout);

export default router;