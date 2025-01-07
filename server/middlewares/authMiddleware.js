import  jwt from "jsonwebtoken";
import Users from '../models/users.js';


//check
const auth = async(req,res,next)=>{
    let token;
    token=req.cookies.jwt;
    // console.log(req.cookies);
    if(token){
        try {
            //const { password, user } = User._doc
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await Users.findById(decode.userId).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token is invalid");
        }
    }else{
        res.status(401);
        throw new Error("Not authorized, no token found");
    }
};

const authAdmin =async(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401).send("Not authorized as an Admin");
    }
};
export {auth,authAdmin};