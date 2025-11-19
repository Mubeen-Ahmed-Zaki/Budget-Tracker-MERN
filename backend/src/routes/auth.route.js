import express from "express"
import { login, signUp } from "../controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/sign-up", signUp);
authRoute.post("/login", login);


export default authRoute;