import { Response } from "../utils/response.js"
import User from '../models/userModel.js'
import cloudinary from 'cloudinary'
import Post from '../models/postModel.js'
import { message } from "../utils/message.js";
export const createPost = async (req, res) => {
    try{
        const {caption, location, mentions, comments,image} = req.body;
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
            
        
        await newPost.save();
        if (newuser) {
            User.posts.unshift(newPost._id);
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

