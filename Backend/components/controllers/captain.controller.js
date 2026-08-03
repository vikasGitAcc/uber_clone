import Captain from '../models/captain.model.js';
import { createCaptain } from '../services/captain.service.js';
import { validationResult } from 'express-validator';
import { ApiError, ApiResponse } from '../utilities/response.utility.js';
import { setCookieOptions } from '../config/cookie.config.js';
import { verifyCaptain } from '../services/captain.service.js';
import BlacklistedTokens from '../models/blacklistToken.model.js';
import OpenAI from 'openai';

export const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(401, 'captain register validation error', errors);
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExists = await Captain.findOne({ email });
    if (isCaptainAlreadyExists) {
        throw new ApiError(409, 'Captain already exists');
    }

    const captain = await createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });

    const token = await captain.generateAuthToken();

    res.status(201)
        .cookie('token', token, setCookieOptions)
        .json(new ApiResponse(200, 'Captain registered successfully', captain));
};

export const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(401, 'validation errors', errors);
    }

    const { email, password } = req.body;
   
    const captain = await verifyCaptain({email, password});

    const token = await captain.generateAuthToken();

    return res.status(201).cookie("token", token, setCookieOptions).json(
        new ApiResponse(200, "captain logged in successfully", captain)
    )
};

export const logoutCaptain = async(req, res, next) => {
    res.clearCookie("token", setCookieOptions);
    await BlacklistedTokens.create({token: req.token});
    return res.status(200).json(new ApiResponse(200, "captain logged out successfully"));
}

export const getCaptainProfile = async(req, res, next) => {
    const captain = req.user;
    const captainData = await Captain.findById(captain._id);
    return res.status(200).json(new ApiResponse(200, "captain profile fetched successfully", captainData));
}
