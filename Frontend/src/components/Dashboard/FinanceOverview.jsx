import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = [
  "#875CF5", // Balance
  "#EF4444", // Expense
  "#F97316", // Income
];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpenses }) => {
  const balanceData = [
    { name: "Balance", amount: totalBalance },
    { name: "Expense", amount: totalExpenses },
    { name: "Income", amount: totalIncome },
  ];

  return (
    <div className="card">
      <div className="mb-6">
        <h5 className="text-xl font-semibold text-gray-900">
          Financial Overview
        </h5>

        <p className="text-sm text-gray-500 mt-1">
          A quick summary of your current financial status.
        </p>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
