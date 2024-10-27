import { Modal, Button, Stack } from "react-bootstrap"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
import { currencyFormatter } from "../utils"

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()

  // Special handling for uncategorized budget
  const isUncategorized = budgetId === UNCATEGORIZED_BUDGET_ID
  
  // Safely get expenses
  const expenses = getBudgetExpenses(budgetId) || []
  
  // Handle budget information
  const budget = isUncategorized
    ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
    : budgets?.find(b => b.id === budgetId)

  // If no valid budget and not uncategorized, close modal
  if (!budget && !isUncategorized) {
    handleClose?.()
    return null
  }

  const handleDeleteExpense = (expense) => {
    try {
      deleteExpense(expense)
    } catch (error) {
      console.error("Error deleting expense:", error)
    }
  }

  return (
    <Modal 
      show={budgetId != null} 
      onHide={handleClose}
      backdrop="static" // Prevent closing by clicking outside
      keyboard={false} // Prevent closing with keyboard
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget?.name || 'Uncategorized'}</div>
            {!isUncategorized && (
              <Button
                onClick={() => {
                  deleteBudget(budget)
                  handleClose()
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.length === 0 ? (
            <div className="text-center text-muted">
              No expenses in this category
            </div>
          ) : (
            expenses.map(expense => (
              <Stack direction="horizontal" gap="2" key={expense.id}>
                <div className="me-auto fs-4">{expense.description}</div>
                <div className="fs-5">
                  {currencyFormatter.format(expense.amount)}
                </div>
                <Button
                  onClick={() => handleDeleteExpense(expense)}
                  size="sm"
                  variant="outline-danger"
                >
                  &times;
                </Button>
              </Stack>
            ))
          )}
        </Stack>
      </Modal.Body>
    </Modal>
  )
}