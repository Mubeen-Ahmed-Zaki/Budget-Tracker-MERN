import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";


export const isLoggedIn = asyncHandler((req, res, next) =>{
    //  fetch token from request
    const token = req.headers.authorization?.split(" ")[1];
    // verify the token
    jwt.verify(token, process.env.JWT_KEY, async (err, decoded)=>{
        if(err) {
            // iff unsuccessfull, then send the error message
            let error = new Error(err?.message);
            next(error);
        }
        else {
            // if, successfull then pass the user object to next object
            const userId = decoded?.user?.id;
            const user = await User.findById(userId).select("username email _id");
            req.userAuth = user;
            next();
        }
    })
});
