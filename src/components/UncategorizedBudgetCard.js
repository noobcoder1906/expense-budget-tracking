import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export default function UncategorizedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets();

  // Safely get expenses and handle potential undefined/null cases
  const expenses = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID) || [];

  // Calculate total amount with error handling
  const amount = expenses.reduce((total, expense) => {
    // Ensure expense amount is a number
    const expenseAmount = Number(expense?.amount) || 0;
    return total + expenseAmount;
  }, 0);

  // Early return with null check
  if (amount === 0) return null;

  // Format the amount for display
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  // Pass necessary props including the UNCATEGORIZED_BUDGET_ID
  return (
    <BudgetCard
      amount={formattedAmount} // Use formatted amount
      name="Uncategorized"
      gray
      {...props}
      budgetId={UNCATEGORIZED_BUDGET_ID} // Explicitly pass budgetId
      onViewExpensesClick={() => {
        // Ensure the onViewExpensesClick handler receives the correct budgetId
        if (props.onViewExpensesClick) {
          props.onViewExpensesClick(UNCATEGORIZED_BUDGET_ID);
        }
      }}
    />
  );
}
