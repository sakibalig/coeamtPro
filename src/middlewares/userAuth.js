import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export async function authorization(
     req,res,next
){
    try{
    const token = req.cookies?.accessToken||
    req.header("Autorization")?.replace("Bearer ", "");
    console.log("token  is : ",token);

    const payLoad = jwt.verify(token,process.env.JWT_SECRET);

    if(!payLoad||payLoad.userId){
           throw new ApiError(401,"Acess denied");
    }

    const user = await User.findById(payLoad.userId);


    if(!user) throw new ApiError(401,"unauthorized user");
    req.headers["userId"] = user._id;
   next();
} catch(error){
     
     if(error instanceof ApiError){
          res.status(400).send({message : "usauthorized user"});
     }
}
}