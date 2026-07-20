import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            minLength: [3, "First name should be of at least 3 characters"]
        },
        lastname:{
            type: String,
            lowercase: true,
            trim: true,
            minLength: [3, "First name should be of at least 3 characters"]
        }
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    email:{
       type: String,
       required: true, 
       unique: true,
       lowercase: true,
       trim: true      
    },
    socketId:{
       type: String 
    }
},{timestamps: true})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAuthToken = async function(){
    return await jwt.sign(
        {_id:this._id},
        process.env.JWT_SECRET
    ) 
}

// userSchema.pre("save", async function(next){
//     if(!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     return next();
// })

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const User = mongoose.model("User", userSchema)

export {User};