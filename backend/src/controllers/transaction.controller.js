import asyncHandler from "express-async-handler";
import Transaction from "../models/Transaction.js"


// @desc Add new transaction
// @route POST /api/transactions
// @access Private
export const addTransaction = asyncHandler(
    async (req, res) => {
        const userId = req.userAuth._id;
        const { title, amount, category, type } = req.body;
        if (!title || !amount || !category || !type) {
            res.status(400);
            throw new Error("Please fill all fields!");
        }

        if (amount <= 0) {
            res.status(400);
            throw new Error("Amount cannot be negative or zero!");
        }

        const transaction = await Transaction.create({
            user: userId,
            title,
            amount,
            category,
            type,
        });

        res.status(201).json({
            status: "success",
            msg: "Transaction added successfully",
            transaction
        })
    }
)

// @desc Get all transactions
// @route GET /api/transactions
// @access Private
export const getTransactions = asyncHandler(async (req, res) => {
    const userId = req.userAuth._id;
    const transaction = await Transaction.find({ user: userId }).sort({ createdAt: -1 });
    res.json({
        status: "success",
        transaction
    })
})


// @desc Delete transaction
// @route DELETE /api/transactions/:id
// @access Private
export const deleteTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
        res.status(400);
        throw new Error("Transaction not found!");
    }

    res.status(200).json({
        status: "success",
        msg: "Transaction Deleted successfully!"
    });
});


