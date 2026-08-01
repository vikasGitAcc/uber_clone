import Captain from '../models/captain.model.js';
import { ApiError } from '../utilities/response.utility.js';

export const createCaptain = async ({
    firstname,
    lastname,
    password,
    email,
    color,
    plate,
    capacity,
    vehicleType,
}) => {
    if (
        !firstname ||
        !password ||
        !email ||
        !color ||
        !plate ||
        !capacity ||
        !vehicleType
    ) {
        throw new ApiError('required fields are missing');
    }

    const captain = await Captain.create({
        fullname: {
            firstname,
            lastname,
        },
        password,
        email,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,
        },
    });

    return captain;
};

export const verifyCaptain = async({email,password}) => {
    
    if(!email || !password){
        throw new ApiError(401, "required fields are missing");
    }

    const captain = await Captain.findOne({email}).select("+password");
    if(!captain){
        throw new ApiError(401, "Captain not found!");
    }

    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        throw new ApiError(401, "Incorrect passwod!");
    }

    return captain;
}
