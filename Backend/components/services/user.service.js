import { User } from '../models/user.model.js';
import { ApiError } from '../utilities/response.utility.js';
export const createUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !email || !password) {
        throw new ApiError(400, 'All fields are required');
    }

    const user = await User.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
    });

    return user;
};

export const verifyUser = async ({ email, password }) => {
   
    if (!email || !password) {
        throw new ApiError(400, 'Missing required fields');
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new ApiError(401, 'Invalid email or password');
    }

    const verifyPassword = await user.comparePassword(password);
    if (!verifyPassword) {
        throw new ApiError(401, 'Invalid Password');
    }

    return user;
};
