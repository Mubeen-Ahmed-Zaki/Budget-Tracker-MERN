import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import toast from "react-hot-toast";

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      toast.success(res.data.msg);
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed! Try again.";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const signUpUserThunk = createAsyncThunk(
  "auth/signup",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/sign-up", {
        username,
        email,
        password,
      });

      toast.success( res.data.msg || "Account created successfully!");
      return res.data.user;
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed! Try again.";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
