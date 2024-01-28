import express from "express"
import UserController from "../controllers/user.controller.js"

const router = express.Router();
const userController = new UserController();

router.get('/',userController.getAllUsers);
router.post('/signup',userController.createUser);
router.post('/login',userController.login);
router.get('/:id',userController.getBlogsByUserId);

export default router;