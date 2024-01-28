import express from "express";
import userRouter from "./user.route.js";
import blogRouter from "./blog.route.js";

const router = express.Router();

router.use("/user",userRouter);
router.use('/blog',blogRouter);

export default router;