import express from "express"
import { addTransaction, deleteTransaction, getTransactions } from "../controllers/transaction.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const transactionRoute = express.Router();

transactionRoute.post("/", isLoggedIn, addTransaction);
transactionRoute.get("/", isLoggedIn, getTransactions);
transactionRoute.delete("/:id", isLoggedIn, deleteTransaction);


export default transactionRoute;