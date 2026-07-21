import {User} from "../models/user.model.js"
import {createUser, verifyUser} from "../services/user.service.js"
import {validationResult} from "express-validator"
import {ApiResponse, ApiError} from "../utilities/response.utility.js"
import {authUser} from "../middlewares/auth.middleware.js"
import {setCookieOptions} from "../config/cookie.config.js"
import BlacklistedTokens from "../models/blacklistToken.model.js"

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

    return res.status(201).cookie("token", token, setCookieOptions).json(
        new ApiResponse(200, "User registered successfully", user)
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
     
     return res.status(201).cookie("token",token,setCookieOptions).json(
        new ApiResponse(200, "User logged in successfully", user)
     )

}

export const logoutUser = async (req,res,next) => {
      res.clearCookie("token",setCookieOptions);
      const token = req.cookies?.token || req.headers.authorization?.split(" ")[1]; 
      await BlacklistedTokens.create({token}) 
      return res.status(201).json(
        new ApiResponse(200, "User logout successfully")
      )
}

export const getUserProfile = async(req,res,next) => {
      return res.status(201).json(
        new ApiResponse(200,"User data fetched successfully", req.user)
      )       
}
