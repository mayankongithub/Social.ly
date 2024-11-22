import { Response } from "../utils/response.js"
import User from '../models/userModel.js'
import cloudinary from 'cloudinary'
import Post from '../models/postModel.js'
import { message } from "../utils/message.js";
export const createPost = async (req, res) => {
    try{
        const {caption, location,image} = req.body;
        const user_present = await User.findById(req.user._id);
        if(!user_present){
            res.status(401).json({
                success: false,
                message: "User not present",
            }); 
        }
        if(!image){
            res.status(401).json({
                success: false,
                message: "image not present",
            }); 
        }
        let post = await Post.create({
            image:{
                public_id: imageUpload.public_id,
                url: imageUpload.url
            },
            caption,
            location
        })
    
        const result = await cloudinary.v2.uploader.upload(image, {
            folder: 'posts',
            // width: 150,
            // crop: "scale",
            // height: 150
        })
            
        
        await post.save();
        if(post){
            User.posts.unshift(post._id);
            await User.save();
        }
        

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            post: newPost,
        }); 
    }
    catch(error){
        Response(res, 500, false, error.message);
    }
}

//get all post
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        if(!posts){
            res.status(401).json({
                success: false,
                message: "User not present",
            }); 
        }
        res.status(200).json({
            success : true,
            message : "Success",
            posts
        })
    } 
    catch (error) {
        res.status(500).json({ message: "No Post", error: error.message });
    }
};


//get post by id
export const getPostsById = async (req, res) => {
    try {
        const {id} = req.params;
        const posts = await Post.findById(id);
        if(!posts){
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Post found successfully",
            post: posts
        }); 
        
    } 
    catch (error) {
        res.status(500).json({ message: "No post", error: error.message });
    }
};


export const deletePostById = async(req,res) => {
    try {
        const post_id = req.params.id;
    
        if (!post_id) {
          return res.status(404).json({
              success: false,
              message: "User not found",
          });
        }
    
        
        const postExists = await Post.findById(post_id);
        if (!postExists) {
          return res.status(404).json({
              success: false,
              message: "User not found",
          });
        }
    
        const deleted_post = await Post.findByIdAndDelete(post_id);
    
    
    
        const user = req.user;
    
        user.posts.forEach((post, index) => {
          if (post.toString() === post_id) {
            user.posts.splice(index, 1);
          }
        });
    
        await user.save();
    
        res.status(200).json({ 
          success: true, 
          message: "Post deleted successfully" 
      });
        
      }
      catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Server Error" });
      }
}
