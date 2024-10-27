import { Form, Modal, Button } from "react-bootstrap"
import { useRef, useState } from "react"
import { useBudgets } from "../contexts/BudgetsContext"

export default function AddBudgetModal({ show, handleClose }) {
  const nameRef = useRef()
  const maxRef = useRef()
  const { addBudget } = useBudgets()
  const [error, setError] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    setError("")

    const name = nameRef.current.value.trim()
    const maxAmount = parseFloat(maxRef.current.value)

    if (!name) {
      setError("Please enter a budget name")
      return
    }

    if (isNaN(maxAmount) || maxAmount <= 0) {
      setError("Please enter a valid maximum amount")
      return
    }

    try {
      addBudget({
        name,
        max: maxAmount,
      })
      handleClose()
    } catch (err) {
      setError("Failed to add budget. Please try again.")
    }
  }

  const modalStyle = {
    content: {
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }
  }

  const inputStyle = {
    transition: 'border-color 0.2s ease-in-out',
    fontSize: '1rem',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1.5px solid #e2e8f0',
    boxShadow: 'none',
    '&:focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)'
    }
  }

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    fontWeight: '500',
    transition: 'all 0.2s ease-in-out',
    borderRadius: '8px',
    backgroundColor: '#3b82f6',
    border: 'none',
    '&:hover': {
      backgroundColor: '#2563eb',
      transform: 'translateY(-1px)'
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered style={modalStyle}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 600, color: '#1e293b' }}>
            Create New Budget
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <Form.Group className="mb-4" controlId="name">
            <Form.Label style={{ fontWeight: 500, color: '#475569' }}>
              Budget Name
            </Form.Label>
            <Form.Control
              ref={nameRef}
              type="text"
              placeholder="Enter budget name"
              style={inputStyle}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="max">
            <Form.Label style={{ fontWeight: 500, color: '#475569' }}>
              Maximum Spending Limit
            </Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              placeholder="Enter maximum amount"
              required
              min={0}
              step={0.01}
              style={inputStyle}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2" style={{ ...buttonStyle, backgroundColor: '#e2e8f0' }}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" style={buttonStyle}>
              Create Budget
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}