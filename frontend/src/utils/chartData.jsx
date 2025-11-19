export const getChartData = (transactions) => {
  const incomeAmount = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  // Group expenses by category
  const expenseCategories = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      if (!expenseCategories[t.category]) {
        expenseCategories[t.category] = 0;
      }
      expenseCategories[t.category] += t.amount;
    });

  const expenseData = Object.keys(expenseCategories).map((category) => ({
    name: category,
    value: expenseCategories[category],
    type: "expense",
  }));

  return [
    { name: "Income", value: incomeAmount, type: "income" },
    ...expenseData,
  ];
};
