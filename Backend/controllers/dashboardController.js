const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Total Income
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // Total Expense
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // Income transactions in last 60 days
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      },
    }).sort({ date: -1 });

    // Total income in last 60 days
    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    // Expense transactions in last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    }).sort({ date: -1 });

    // Total expense in last 30 days
    const expensesLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    // Last 5 income transactions
    const recentIncome = (
      await Income.find({ userId }).sort({ date: -1 }).limit(5)
    ).map((txn) => ({
      ...txn.toObject(),
      type: "income",
    }));

    // Last 5 expense transactions
    const recentExpense = (
      await Expense.find({ userId }).sort({ date: -1 }).limit(5)
    ).map((txn) => ({
      ...txn.toObject(),
      type: "expense",
    }));

    // Merge and keep latest 5 transactions
    const recentTransactions = [...recentIncome, ...recentExpense]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    // Final Response
    res.status(200).json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),

      totalIncome: totalIncome[0]?.total || 0,

      totalExpenses: totalExpense[0]?.total || 0,

      last30DaysExpenses: {
        total: expensesLast30Days,
        transactions: last30DaysExpenseTransactions,
      },

      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },

      recentTransactions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
