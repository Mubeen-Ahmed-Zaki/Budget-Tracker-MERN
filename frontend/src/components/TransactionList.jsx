import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransactionsThunk, getTransactionsThunk } from "../Store/thunk/transaction.thunk";
import { Trash2 } from "lucide-react";
import { formatDateTime } from "../utils/time";

const TransactionList = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transaction);

  useEffect(()=>{
    dispatch(getTransactionsThunk());
  },[])

  const [filter, setFilter] = useState("all");
  const filteredTransactions = transactions.filter((transaction)=>{
    if(filter === "all") return true;
    return transaction.type === filter;
  })

  return (
    <>
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl font-bold text-gray-800">
              Transaction History
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter("all")}
                className={`btn btn-sm text-sm border-0 rounded-lg font-medium transition ${
                  filter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("income")}
                className={`btn btn-sm text-sm border-0 rounded-lg font-medium transition ${
                  filter === "income"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Income
              </button>
              <button
                onClick={() => setFilter("expense")}
                className={`btn btn-sm text-sm border-0 rounded-lg font-medium transition ${
                  filter === "expense"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Expenses
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Title
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500">
                          No transactions found
                        </td>
                  </tr>
                ) : (
                  filteredTransactions.map((transaction)=>(
                    <tr key={transaction._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-800">{transaction.title}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {transaction.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">{formatDateTime(transaction.createdAt)}</td>
                      <td className={`py-4 px-4 text-right font-semibold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => dispatch(deleteTransactionsThunk(transaction._id))}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionList;
