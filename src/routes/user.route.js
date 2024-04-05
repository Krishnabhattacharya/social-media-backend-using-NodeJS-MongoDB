import express from 'express';
import { loginController, resgisterController, updateUserController } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const userRoute = express.Router();

userRoute.post("/api/v1/auth/register", resgisterController);
userRoute.post("/api/v1/auth/login", loginController);
userRoute.post("/api/v1/auth/update-user", authMiddleware, updateUserController);
export default userRoute;