import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken"
import {ApiError} from "../utilities/response.utility.js"

export const authUser = async(req,res,next) => {
     const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
     if(!token){
         throw new ApiError("Unauthorized access or token not found at user authentication");
     }
       
     try{

        const user = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        console.log(user)
        return next();

     }catch(err){
        throw new ApiError(401, "Unauthorized access!");
     }
}