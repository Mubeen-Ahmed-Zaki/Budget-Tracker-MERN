import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

const BarChartBox = () => {
  const { transactions } = useSelector((state) => state.transaction);

  // Group by category and split income vs expense
  const categories = {};

  transactions.forEach((t) => {
    if (!categories[t.category]) {
      categories[t.category] = { income: 0, expense: 0 };
    }

    if (t.type === "income") {
      categories[t.category].income += t.amount;
    } else {
      categories[t.category].expense += t.amount;
    }
  });

  const data = Object.entries(categories).map(([category, values]) => ({
    category,
    income: values.income,
    expense: values.expense,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Category Comparison
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />

          <Bar dataKey="income" fill="#36454F" name="Income" radius={[8, 8, 0, 0]} />
          <Bar dataKey="expense" fill="#6082B6" name="Expense" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartBox;
