import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth.slice";
import transactionReducer from "./slice/transaction.slice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer
  },
});
