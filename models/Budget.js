const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  max: { type: Number, required: true },
});

module.exports = mongoose.model("Budget", BudgetSchema);
