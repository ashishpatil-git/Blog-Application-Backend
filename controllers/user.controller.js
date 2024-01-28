import Users from "../model/user.js";
import bcrypt from "bcrypt";

class UserController {
    async getAllUsers(req, res) {
        let resUser;
        try {
            resUser = await Users.find();
            if (!resUser) {
                res.status(404).json({ message: "No User found" });
            }
            res.status(200).json({ data: resUser });
        } catch (err) {
            console.log(err);
        }
    };

    async createUser(req, res) {
        const { name, email, password } = req.body;
        let existingUser;
        try {
            existingUser = await Users.findOne({ email });
        } catch (error) {
            console.error(error);
        }
        if (existingUser) {
            res.status(400).jsob({ message: "User Already exists,Please login" })
        } else {
            try {
                let hashedPassword = bcrypt.hashSync(password,10);
                let newUser = new Users({
                    name,
                    email,
                    password : hashedPassword,
                    blogs : []
                })
                await newUser.save();
                res.status(201).json({message:"User created successfully",data:newUser});
            } catch (error) {
                console.error(error);
            }
        }
    };
    
    async login(req,res){
        const { email, password } = req.body;
        let existingUser;
        try {
            existingUser = await Users.findOne({ email });
            if (!existingUser) {
                res.status(400).jsob({ message: "User with given email does not exist,Kindly register" })
            }
            let checkifuserExist = bcrypt.compareSync(password,existingUser.password);
            if(checkifuserExist){
                res.status(200).json({ message: "User found",data:existingUser });
            }else{
                res.status(401).json({ message: "Invalid Credentials"});
            }
            // next();
        } catch (error) {
            console.error(error);
        }
    };

    async getBlogsByUserId(req,res){
        const userId = req.params.id;
        let userBlogs;
        try {
            userBlogs = await Users.findById(userId).populate('blogs');
        } catch (error) {
            console.log(error);
        }
        
        if(!userBlogs){
            return res.status(400).json({message:"No Blogs found"});
        }
        return res.status(200).json({message:"User Blogs found",data:userBlogs});
    }
}

export default UserController;