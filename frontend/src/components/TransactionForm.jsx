import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { addTransactionsThunk } from "../Store/thunk/transaction.thunk";

const TransactionForm = () => {

  const dispatch = useDispatch();

  const [transactionData, setTransactionData] = useState({
    title:"",
    amount:"",
    category:"",
    type:"",
  })

  const onhandleChange = (e) =>{
    setTransactionData({
      ...transactionData, [e.target.name]: e.target.value,
    });
  }

  const transactionSubmit = async (e) =>{
    e.preventDefault();
    await dispatch(addTransactionsThunk(transactionData))
    setTransactionData({
      title:"",
      amount:"",
      category:"",
      type:"",
    })
  }
  return (
    <>
      <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <PlusCircle className="w-6 h-6 mr-2 text-blue-600" /> Add Transaction </h2>
            <form className="space-y-4" onSubmit={transactionSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"> Title </label>
                <input
                  type="text"
                  name="title"
                  value={transactionData.title}
                  onChange={onhandleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"> Amount </label>
                <input
                  type="number"
                  name="amount"
                  value={transactionData.amount}
                  onChange={onhandleChange}
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"> Category </label>
                <select
                  name="category"
                  value={transactionData.category}
                  onChange={onhandleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="">Select category</option>
                  <option value="Food">Food</option>
                  <option value="Rent">Rent</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Transport">Transport</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Income">Income</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Type</label>
                <div className="flex space-x-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="expense"
                      checked={transactionData.type == "expense"}
                      onChange={onhandleChange}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="ml-2 text-gray-700">Expense</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="income"
                      checked={transactionData.type == "income"}
                      onChange={onhandleChange}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700">Income</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full text-amber-50 transition-all transform hover:scale-105 hover:cursor-pointer shadow-md"
              >
                Add Transaction
              </button>
            </form>
          </div>
        </div>
    </>
  );
};

export default TransactionForm;
