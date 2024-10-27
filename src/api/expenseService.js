import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Budgets API
export const getBudgets = async () => await axios.get(`${API_URL}/budgets`);
export const createBudget = async (name, max) => 
  await axios.post(`${API_URL}/budgets`, { name, max });

// Expenses API
export const getExpensesByBudget = async (budgetId) => 
  await axios.get(`${API_URL}/expenses/${budgetId}`);
export const createExpense = async (budgetId, description, amount) => 
  await axios.post(`${API_URL}/expenses`, { budgetId, description, amount });
