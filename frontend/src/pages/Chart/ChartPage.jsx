import React from "react";
import PieChartBox from "../../components/PieChartBox";
import BarChartBox from "../../components/BarChartBox";
import { useSelector } from "react-redux";

const ChartPage = () => {
  const { transactions } = useSelector((state) => state.transaction);

  if (transactions.length === 0) {
    return (
      <div className="text-center mt-10 bg-white shadow-lg p-10 rounded-2xl text-gray-500 text-lg">
        No chart available
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <PieChartBox />
        <BarChartBox />
      </div>
    </>
  );
};

export default ChartPage;
