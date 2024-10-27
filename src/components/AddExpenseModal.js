import { Form, Modal, Button } from "react-bootstrap";
import { useRef, useState } from "react";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext";

export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpense, budgets } = useBudgets();
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation modal

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const description = descriptionRef.current.value.trim();
    const amount = parseFloat(amountRef.current.value);
    const budgetId = budgetIdRef.current.value;

    if (!description) {
      setError("Please enter a description");
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      addExpense({
        description,
        amount,
        budgetId,
      });
      handleClose(); // Close the main modal
      setShowConfirmation(true); // Show the confirmation modal
    } catch (err) {
      setError("Failed to add expense. Please try again.");
    }
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false); // Close confirmation modal
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title style={{ fontWeight: 600, color: '#1e293b' }}>
              Add New Expense
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <Form.Group className="mb-4" controlId="description">
              <Form.Label style={{ fontWeight: 500, color: '#475569' }}>
                Description
              </Form.Label>
              <Form.Control
                ref={descriptionRef}
                type="text"
                placeholder="Enter expense description"
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="amount">
              <Form.Label style={{ fontWeight: 500, color: '#475569' }}>
                Amount
              </Form.Label>
              <Form.Control
                ref={amountRef}
                type="number"
                placeholder="Enter amount"
                required
                min={0}
                step={0.01}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="budgetId">
              <Form.Label style={{ fontWeight: 500, color: '#475569' }}>
                Budget Category
              </Form.Label>
              <Form.Select
                defaultValue={defaultBudgetId}
                ref={budgetIdRef}
              >
                <option value={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                {budgets.map(budget => (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Add Expense
              </Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={handleCloseConfirmation} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 600 }}>Expense Recorded</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your expense has been successfully recorded!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseConfirmation}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
