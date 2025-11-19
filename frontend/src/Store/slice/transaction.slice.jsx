import { createSlice } from "@reduxjs/toolkit";
import { addTransactionsThunk, deleteTransactionsThunk, getTransactionsThunk } from "../thunk/transaction.thunk";

const initialState = {
  transactions: [],
  loading: false,
};

const transcationSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Show all transactions
      .addCase(getTransactionsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getTransactionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })

      .addCase(getTransactionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add transactions
      .addCase(addTransactionsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addTransactionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions.push(action.payload);
      })

      .addCase(addTransactionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // Delete transaction
    .addCase(deleteTransactionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = state.transactions.filter(
            (transaction) => transaction._id !== action.payload
        );
      });
  },
});

export default transcationSlice.reducer;