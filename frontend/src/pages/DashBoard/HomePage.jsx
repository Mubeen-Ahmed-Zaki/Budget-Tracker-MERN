import React from "react";
import SummaryCards from "../../components/SummaryCards";
import TransactionPage from "../Transaction/TransactionPage";
import ChartPage from "../Chart/ChartPage";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SummaryCards />
        <TransactionPage/>
        <ChartPage/>
      </div>
    </div>
  );
};

export default HomePage;
