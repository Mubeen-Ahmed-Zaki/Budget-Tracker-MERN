import React from "react";
import { useSelector } from "react-redux";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";

const SummaryCards = () => {
  const { transactions } = useSelector((state) => state.transaction);

  const totalIncome = transactions
    .filter((total) => total.type === "income")
    .reduce((sum, total) => sum + total.amount, 0);

  const totalExpense = transactions
    .filter((total) => total.type === "expense")
    .reduce((sum, total) => sum + total.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-20">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Income
              </p>
              <p className="text-3xl font-bold text-green-600">
                ${totalIncome.toFixed(2)}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Expenses
              </p>
              <p className="text-3xl font-bold text-red-600">
                ${totalExpense.toFixed(2)}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Balance</p>
              <p className={`text-3xl font-bold ${totalBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  ${totalBalance.toFixed(2)}
                </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryCards;
