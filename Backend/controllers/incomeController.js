const xlsx = require("xlsx");
const Income = require("../models/Income");

//Add Income source
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    //validation: check for missing details
    if (!source || amount === undefined || amount === null || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//Get All Income Source
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Income source
exports.deleteIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const deletedIncome = await Income.findOneAndDelete({
      _id: req.params.id,
      userId,
    });

    if (!deletedIncome) {
      return res.status(404).json({
        message: "Income not found",
      });
    }

    res.status(200).json({
      message: "Income deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

//Download Excel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    //prepare data for Excel
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "Income_details.xlsx");
    res.download("Income_details.xlsx");
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
