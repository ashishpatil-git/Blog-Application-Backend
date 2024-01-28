import express from "express";
import BlogController from "../controllers/blog.controller.js";

const blogRouter = new express.Router();
const blogController = new BlogController();

blogRouter.get("/",blogController.getAll);
blogRouter.post("/add",blogController.add);
blogRouter.put("/update/:id",blogController.edit);
blogRouter.get("/:id",blogController.getById);
blogRouter.delete("/:id",blogController.delete);

export default blogRouter;