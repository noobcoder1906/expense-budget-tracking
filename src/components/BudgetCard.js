import { Button, Card, ProgressBar, Stack } from "react-bootstrap"
import { currencyFormatter } from "../utils"

export default function BudgetCard({
  name,
  amount,
  max,
  gray,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
}) {
  const classNames = []
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10")
  } else if (gray) {
    classNames.push("bg-light")
  }

  const cardStyle = {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '16px',
    border: '1px solid rgba(0,0,0,0.08)',
    backgroundColor: gray ? '#f8fafc' : '#ffffff',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)'
    }
  }

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1e293b',
    letterSpacing: '-0.025em'
  }

  const amountStyle = {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: amount > max ? '#dc2626' : '#0f172a',
    transition: 'color 0.2s ease-in-out'
  }

  const buttonStyle = {
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    fontWeight: '500',
    padding: '0.75rem 1.25rem',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
    }
  }

  const progressBarStyle = {
    height: '10px',
    borderRadius: '999px',
    transition: 'all 0.2s ease-in-out',
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
  }

  return (
    <Card className={classNames.join(" ")} style={cardStyle}>
      <Card.Body style={{ padding: '1.5rem' }}>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2" style={titleStyle}>{name}</div>
          <div className="d-flex align-items-baseline" style={amountStyle}>
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted ms-1" style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                opacity: 0.8
              }}>
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
            style={progressBarStyle}
            animated={amount > max}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
              style={{
                ...buttonStyle,
                marginRight: '8px',
                borderColor: '#3b82f6',
                color: '#3b82f6',
                '&:hover': {
                  ...buttonStyle['&:hover'],
                  backgroundColor: '#3b82f6',
                  color: '#ffffff'
                }
              }}
            >
              Add Expense
            </Button>
            <Button 
              onClick={onViewExpensesClick} 
              variant="outline-secondary"
              style={{
                ...buttonStyle,
                borderColor: '#64748b',
                color: '#64748b',
                '&:hover': {
                  ...buttonStyle['&:hover'],
                  backgroundColor: '#64748b',
                  color: '#ffffff'
                }
              }}
            >
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  )
}

function getProgressBarVariant(amount, max) {
  const ratio = amount / max
  if (ratio < 0.5) return "success"
  if (ratio < 0.75) return "warning"
  return "danger"
}