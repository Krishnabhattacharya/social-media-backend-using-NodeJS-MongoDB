
import express from "express";
import authMiddleware from '../middlewares/auth.middleware.js'
import { checkLikeunlikePost, commentPostController, deleteComment, deletePostController, getAllPostController, getPerUserPost, likeUnlikePostController, makePostController, updatePostController } from "../controllers/post.controller.js";
const postRoute = express.Router();
postRoute.post("/post/api/v1/make-post", authMiddleware, makePostController);
postRoute.get("/post/api/v1/get-all-post", authMiddleware, getAllPostController);
postRoute.put("/post/api/v1/update-post/:postId", authMiddleware, updatePostController);
postRoute.delete("/post/api/v1/delete-post/:postId", authMiddleware, deletePostController);
postRoute.get("/post/api/v1/get-per-user-post/:userId", authMiddleware, getPerUserPost);
postRoute.post("/post/api/v1/like-unlike-post/:postId", authMiddleware, likeUnlikePostController);
postRoute.get("/post/api/v1/check-like-unlike-post/:postId", authMiddleware, checkLikeunlikePost);
postRoute.post("/post/api/v1/comment-post/:postId", authMiddleware, commentPostController);
postRoute.post("/post/api/v1/delete-comment-posts/:postId/comment/:commentId", authMiddleware, deleteComment);
export default postRoute;