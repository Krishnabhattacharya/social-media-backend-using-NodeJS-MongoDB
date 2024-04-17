import express from 'express';
import { loginController, resgisterController, searchuserController, updateUserController } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const userRoute = express.Router();

userRoute.post("/api/v1/auth/register", resgisterController);
userRoute.post("/api/v1/auth/login", loginController);
userRoute.post("/api/v1/auth/update-user", authMiddleware, updateUserController);
userRoute.post("/api/v1/search-user", authMiddleware, searchuserController);
export default userRoute;