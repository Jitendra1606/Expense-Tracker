const xlsx = require("xlsx");
const Expense = require("../models/Expense");

// Add Expense
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    // Validation
    if (!category || amount === undefined || amount === null || !date) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();

    res.status(200).json(newExpense);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Expenses
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenses = await Expense.find({ userId }).sort({
      date: -1,
    });

    res.json(expenses);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const deletedExpense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId,
    });

    if (!deletedExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Download Expense Excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenses = await Expense.find({ userId }).sort({
      date: -1,
    });

    // Prepare data for Excel
    const data = expenses.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(wb, ws, "Expenses");

    xlsx.writeFile(wb, "Expense_details.xlsx");

    res.download("Expense_details.xlsx");
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
