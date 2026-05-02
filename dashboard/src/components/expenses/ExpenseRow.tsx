import type { Category } from '../../types/category'
import type { Expense } from '../../types/expense'
import { formatCurrencyPLN, formatDatePL } from '../../utils/format'

export function ExpenseRow({
  expense,
  category,
  onDelete,
}: {
  expense: Expense
  category: Category | undefined
  onDelete: (id: string) => void
}) {
  return (
    <tr>
      <td className="cellDate">{formatDatePL(expense.date)}</td>
      <td className="cellCategory">
        <span className="categoryPill">
          <span
            className="categoryDot"
            aria-hidden="true"
            style={{ background: category?.color ?? 'var(--border)' }}
          />
          {category?.name ?? '—'}
        </span>
      </td>
      <td className="cellNote">{expense.note?.trim() ? expense.note : '—'}</td>
      <td className="cellAmount">{formatCurrencyPLN(expense.amount)}</td>
      <td className="cellActions">
        <button type="button" className="button buttonDanger" onClick={() => onDelete(expense.id)}>
          Usuń
        </button>
      </td>
    </tr>
  )
}

