import mongoose from "mongoose";

async function connectToDB(){
    try{
      await mongoose.connect(process.env.DB_CONNECT);
      console.log("Database connected sucessfully")

    }catch(err){
       console.log(err) 
    }
}

export {connectToDB} 