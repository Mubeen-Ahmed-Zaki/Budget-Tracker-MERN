import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { getChartData } from "../utils/chartData";

const EXPENSE_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#ef4444",
];

const PieChartBox = () => {
  const { transactions } = useSelector((state) => state.transaction);
  const data = getChartData(transactions);

  const legendFormatter = (value, entry) => {
    if (value === "Income") return "Income";
    return `${value} Expense`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        (Income vs Expense) Breakdown
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            nameKey="name"
            outerRadius={80}
            dataKey="value"
          >
            {data.map((entry, index) => {
              if (entry.type === "income") {
                return <Cell key={index} fill="#16a34a" />; // GREEN FIXED
              }
              return (
                <Cell
                  key={index}
                  fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]}
                />
              );
            })}
          </Pie>

          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend formatter={legendFormatter} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartBox;
