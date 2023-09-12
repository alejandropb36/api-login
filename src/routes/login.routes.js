import { Router } from "express";
import { login, register, getProfile } from '../controllers/login.controller.js';
import { registerValidate, loginValidate } from '../validators/user.validator.js';
const router = Router();

router.post('/login', loginValidate, login);
router.post('/register', registerValidate, register);
router.post('/profile', getProfile);

export default router;