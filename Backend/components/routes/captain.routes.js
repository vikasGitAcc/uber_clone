import express from 'express';
import { registerCaptain, loginCaptain } from '../controllers/captain.controller.js';
import { body } from 'express-validator';
import asyncHandler from '../utilities/asyncHandler.utility.js';

const router = express.Router();

router.post(
    '/register',
    [
        body('fullname.firstname')
            .isLength({ min: 3 })
            .withMessage('first name should be at least 3 characters long'),
        body('email').isEmail().withMessage('Invalid Email'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password should be at least 6 characters long'),
        body('vehicle.color')
            .isLength({ min: 3 })
            .withMessage('Color should be at least 3 char long'),
        body('vehicle.plate')
            .isLength({ min: 3 })
            .withMessage('plate should be at least 3 char long'),
        body('vehicle.capacity')
            .isInt({ min: 1 })
            .withMessage('capacity must be at least 1'),
        body('vehicle.vehicleType')
            .isIn(['motorcycle', 'car', 'auto'])
            .withMessage('Invalid vehicle type'),
    ],
    asyncHandler(registerCaptain)
);

router.post("/login",[
    body("email").isEmail().withMessage("Invalid email!"),
    body("password").isLength({min:6}).withMessage("Password should be at least 6 characters long")
],asyncHandler(loginCaptain))

export default router;
