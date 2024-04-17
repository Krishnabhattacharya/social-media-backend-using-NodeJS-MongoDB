import express from 'express';
import { blockUnblockUserController, loginController, resgisterController, searchuserController, sendOtpController, updateUserController, verifyOtp } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const userRoute = express.Router();

userRoute.post("/api/v1/auth/register", resgisterController);
userRoute.post("/api/v1/auth/login", loginController);
userRoute.post("/api/v1/auth/update-user", authMiddleware, updateUserController);
userRoute.post("/api/v1/search-user", authMiddleware, searchuserController);
userRoute.post("/api/v1/auth/send-otp", authMiddleware, sendOtpController);
userRoute.post("/api/v1/auth/verify-otp", authMiddleware, verifyOtp);
userRoute.post("/api/v1/block-unblock-user", authMiddleware, blockUnblockUserController);
export default userRoute;