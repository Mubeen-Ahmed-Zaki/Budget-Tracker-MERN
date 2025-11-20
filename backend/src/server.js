import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import authRoute from "./routes/auth.route.js";
import { globalError, notFound } from "./middlewares/globalErrorHandler.js";
import cors from "cors"
import transactionRoute from "./routes/transaction.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://budget-tracker-mern-s74h.vercel.app"],
    credentials: true,
  })
);


//! database connect
connectDB();

// !middleware
app.use("/api/auth", authRoute);
app.use("/api/transactions", transactionRoute);

//! error handler
app.use(notFound);
app.use(globalError);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost: ${PORT}`)
})
