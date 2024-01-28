import mongoose from 'mongoose';
import Blog from '../model/blog.js';
import User from '../model/user.js';

class BlogController{
    async getAll(req,res){
        let allBlogs;
        try {
            allBlogs = await Blog.find();
            if (!allBlogs) {
                res.status(404).json({ message: "No Blogs found" });
            }
            res.status(200).json({ data: allBlogs });
        } catch (err) {
            console.log(err);
        }
    }

    async getById(req,res){
        const blogId = req.params.id;
        let blog;
        try {
            blog = await Blog.findById(blogId);
            if (!blog) {
                res.status(404).json({ message: "No Blog found" });
            }else{
                res.status(200).json({ data: blog });
            }
        } catch (err) {
            console.log(err);
        }
    }

    async add(req,res){
        const {title,description,image,user} = req.body;
        let existingUser;
        try {
            existingUser = await User.findById(user);            
        } catch (error) {
            return res.status(500).json({message:error});
            console.error(error);
        }
        if(!existingUser){
            return res.status(400).json({message:"User not Found"})
        }
        let newBlog = new Blog({
            title,
            image,
            description,
            user
        });
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            await newBlog.save({session});
            existingUser.blogs.push(newBlog);
            await existingUser.save({session});
            await session.commitTransaction();
        } catch (error) {
            console.log(error);
            return res.status(500).json({message:error});
        }
        res.status(201).json({message:"New Blog Created"});
    };

    async delete(req,res){
        let blogId = req.params.id;
        let blog;
        try {
            blog = await Blog.findByIdAndDelete(blogId).populate('user');
            await blog.user.blogs.pull(blog);
            if (!blog) {
                res.status(404).json({ message: "No Blog found" });
            }
            res.status(200).json({ message:"Blog Deleted Sucessfully", data: blog });
        } catch (err) {
            console.log(err);
        }
    };
    
    async edit(req,res){
        const blogId = req.params.id;
        const {title,description} = req.body;
        let blog;
        try {
            blog = await Blog.findByIdAndUpdate(blogId,{
                title,
                description
            });
        } catch (error) {
            return console.log(error);
        }
        if(!blog){
            res.status(500).json({message:"Unable to Update Blog"});
        }
        res.status(200).json({message:"blog updated successfully",data:blog});
    }
}

export default BlogController;