import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const loginController =async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message:"User not found"});
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid password"});
        res.status(200).json({
            message:"Login successful",
            user
        })
    }
    catch(err){
        console.log(err);
    }
}

const firstController = (req,res)=>{
    res.send("Hello world");
}


export default loginController
export {firstController}