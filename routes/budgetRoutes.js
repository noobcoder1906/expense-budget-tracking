const express = require("express");
const Budget = require("../models/Budget");
const router = express.Router();

// Create a new budget
router.post("/budgets", async (req, res) => {
  try {
    const budget = new Budget(req.body);
    await budget.save();
    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all budgets
router.get("/budgets", async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
