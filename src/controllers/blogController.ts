import type { Response } from "express";

import Blog from "../models/Blogs.js";
import type { AuthRequest } from "../middlewares/auth.js";

export async function createBlog(req: AuthRequest, res: Response) {
    try {
        const {title, content} = req.body as {title: string, content: string};

        if (!title || !content) {
            return res.status(400).json({message: "Title and content are required"});
        }

        const imageUrl = req.file? `/uploads/${req.file.filename}`: undefined;
        const blog = await Blog.create({
            title, 
            content, 
            author: req.userId as string,
            ...(imageUrl && { imageUrl })
        });
        return res.status(201).json({message:"Blog created successfully", blog})
    } catch(error){
        console.error("Error creating blog", error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export async function listBlogs(req: AuthRequest, res: Response){
    try{
        const blogs = await Blog.find().populate("author", "name email").sort({createdAt: -1});
        return res.status(200).json({blogs});
    } catch(error){
        console.error("Error listing blogs", error);
        return res.status(500).json({message:"Internal server error"});
    }
}

// get blog by id
export async function getBlogById(req: AuthRequest, res: Response){
    try{
        const {id} = req.params as {id: string}
        const blog = await Blog.findById(id).populate("author", "name email");
        if(!blog){
            return res.status(404).json({message: "Blog not found"});
        }
        return res.status(200).json({blog});
    }catch(error){
        console.error("Error getting blog", error);
        return res.status(500).json({message:"Internal server error"});
    }
}

// update blog
export async function updateBlog(req: AuthRequest, res: Response){
    try{
        const {id} = req.params as {id: string}
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({message: "Not found"});
        if (blog.author.toString() !== req.userId){
            return res.status(403).json({message: "Forbidden"});
        }
        const {title, content} = req.body as {title: string, content: string};
        if (typeof title === "string") blog.title = title;
        if (typeof content === "string") blog.content = content;
        await blog.save();
        return res.status(200).json({message:"Blog updated successfully", blog});
    }catch(error){
        console.error("Error updating blog", error);
        return res.status(500).json({message:"Internal server error"});
    }
}
