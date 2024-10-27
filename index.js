const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const budgetRoutes = require("./routes/budgetRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/expenses-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Failed to connect to MongoDB", err));

// Define routes
app.get("/", (req, res) => {
  res.send("Expense backend server is running");
});
app.use("/api", budgetRoutes);
app.use("/api", expenseRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
