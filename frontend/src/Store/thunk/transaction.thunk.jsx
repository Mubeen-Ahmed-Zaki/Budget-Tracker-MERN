import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import toast from "react-hot-toast";

export const getTransactionsThunk = createAsyncThunk(
  "transactions/",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/transactions");
      return res.data.transaction;
    } catch (error) {
      const message =
        error.response?.data?.message || "failed all transactions! Try again.";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const addTransactionsThunk = createAsyncThunk(
  "transactions/add",
  async ({ title, amount, category, type }, { rejectWithValue }) => {
    try {
      const res = await api.post("/transactions", {
        title,
        amount,
        category,
        type,
      });
      toast.success(res.data.msg);
      return res.data.transaction;
    } catch (error) {
      const message = error.response?.data?.message || "Add transaction failed! Try again.";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);


export const deleteTransactionsThunk = createAsyncThunk(
  "transactions/delete",
  async ( id , { rejectWithValue }) => {
    try {
      const res = await api.delete(`/transactions/${id}`);
      toast.success(res.data.msg);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete transaction! Try again.";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);



