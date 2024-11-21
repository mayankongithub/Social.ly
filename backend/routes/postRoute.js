import express from "express";
import { createPost,deletePostById,getAllPosts, getPostsById} from "../controllers/postController.js";
import {isAuthenticated} from '../middleware/auth.js'
const postRouter = express.Router();

postRouter.post("/create/post", isAuthenticated,createPost);
postRouter.get("/getAllPosts", isAuthenticated,getAllPosts);
postRouter.get("/getPost/:id", isAuthenticated,getPostsById);
postRouter.delete("/deletePostBy/:id", isAuthenticated,deletePostById);

export default postRouter;