import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname:{
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            minLength: [3, "first name should be atleast 3 char long"]
        },
        lastname:{
            type: String,
            lowercase: true,
            trim: true,
            minLength: [3, "last name should be atleast 3 char long"]
        }
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
       type: String,
       required: true,
       minLength: [6, "Password should be at least 6 characters long"],
       select: false
    },
    socketId:{
        type: String
    },
    vehicle:{
        color:{
            type: String,
            minLength:[3, "color should be 3 characters long"],
            required: true,
            trim: true
        },
        plate:{
            type: String,
            required: true,
            trim: true,
            minLength: [3, "Plate no. should be more than 3 characters long"]
        },
        vehicleType:{
            type: String,
            enum: ["motorcycle", "car", "auto"],
            required: true
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, "Vehicle capacity must be atleast 1"]
        }
    },
    location:{
        lat:{
            type: String
        },
        lng:{
            type: String
        }
    },
    status: {
        type: String,
        enum: ["active","inactive"],
        default: "inactive"
    }
})


captainSchema.methods.generateAuthToken = async function(){
    const token = await jwt.sign({_id: this._id}, process.env.CAPTAIN_JWT_SECRET, {expiresIn: process.env.CAPTAIN_JWT_EXPIRES});
    
    return token;
}

captainSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
    return;
})

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const Captain = mongoose.model("Captain", captainSchema);

export default Captain;