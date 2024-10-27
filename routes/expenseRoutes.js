const express = require("express");
const Expense = require("../models/Expense");
const router = express.Router();

// Create a new expense
router.post("/expenses", async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all expenses for a specific budget
router.get("/expenses/:budgetId", async (req, res) => {
  try {
    const expenses = await Expense.find({ budgetId: req.params.budgetId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
