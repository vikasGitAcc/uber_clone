import {User} from "../models/user.model.js"
import {createUser, verifyUser} from "../services/user.service.js"
import {validationResult} from "express-validator"
import {ApiResponse, ApiError} from "../utilities/response.utility.js"
import {authUser} from "../middlewares/auth.middleware.js"

export const registerUser = async (req,res,next) => {
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    console.log(req.body)
    const {fullname:{firstname, lastname}, email, password} = req.body;
    
    const hashedPassword = await User.hashPassword(password);
    
    const user = await createUser({
        firstname,
        lastname,
        email,
        password: hashedPassword
    })

    const token = await user.generateAuthToken();

    return res.status(201).json(
        new ApiResponse(200, "User registered successfully", {token, user})
    )
}

export const loginUser = async (req,res,next) => {
    const errors = validationResult(req);
     if(!errors.isEmpty()){
          throw new ApiError(400, "Invalid login data", errors.array())
     }
     
     const {email,password} = req.body;
     const user = await verifyUser({email,password});

     const token = await user.generateAuthToken();
     
     return res.status(201).json(
        new ApiResponse(200, "User logged in successfully", {token, user})
     )

}

export const logoutUser = async (req,res,next) => {
       
}

export const getUserProfile = async(req,res,next) => {
      console.log(req.user);       
}
