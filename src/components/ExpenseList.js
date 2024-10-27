import React from 'react';
import { useBudgets } from "../contexts/BudgetsContext";
import { Table } from "react-bootstrap";

export default function ExpenseList() {
  const { expenses } = useBudgets(); // Assuming you have a way to access expenses from your context

  return (
    <div className="expense-list">
      <h2>Your Expenses</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Budget Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center">
                No expenses recorded
              </td>
            </tr>
          ) : (
            expenses.map(expense => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.amount.toFixed(2)}</td>
                <td>{expense.budgetId}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
