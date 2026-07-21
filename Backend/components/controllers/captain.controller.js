import Captain from "../models/captain.model.js";
import {createCaptain} from "../services/captain.service.js";
import {validationResult} from "express-validator";
import {ApiError,ApiResponse} from "../utilities/response.utility.js"
import {setCookieOptions} from "../config/cookie.config.js"

export const registerCaptain = async (req,res,next) => {
    console.log(req.body)
     const errors = validationResult(req);
     if(!errors.isEmpty()){
        throw new ApiError(401, "captain register validation error", errors)
     }
     
     const {fullname, email, password, vehicle} = req.body;

     const captain = await createCaptain({
        firstname:fullname.firstname,
        lastname: fullname.lastname,
        email,
        password,
        color:vehicle.color,
        plate:vehicle.plate, 
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType      
     })

     const token = await captain.generateAuthToken();

     res.status(201).cookie("token", token, setCookieOptions).json(
        new ApiResponse(200,"Captain registered successfully", captain)
     )
}