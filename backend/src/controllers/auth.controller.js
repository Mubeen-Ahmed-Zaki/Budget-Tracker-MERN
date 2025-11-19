import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import GenerateToken from "../utils/generateToken.js"


// @desc Create new user
// @route api/auth/sign-up
// @access public
export const signUp = asyncHandler(
    async (req, res, next) => {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400);
            throw new Error("All fields are required!");
        }

        if (password.length < 6) {
            res.status(400);
            throw new Error("Password must be atleast 6 characters!");
        }

        const user = await User.findOne({ email });
        if (user) {
            throw new Error("User already exists!");
        }

        const hasedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hasedPassword
        });

        res.json({
            status: "success",
            msg: "User create successfully!",
            user: newUser
        })
    }
);

// @desc login user
// @route api/auth/login
// @access public
export const login = asyncHandler(
    async (req, res, next) => {

        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400);
            throw new Error("All fields are required!");
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400);
            throw new Error("invalid credientials!");
        }

        const isMatch = await bcrypt.compare(password, user?.password)
        if (!isMatch) {
            res.status(400);
            throw new Error("Invalid credientials!");
        }


        res.json({
            status: "success",
            msg: "Login successfully!",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token: GenerateToken(user),
        })
    }
);