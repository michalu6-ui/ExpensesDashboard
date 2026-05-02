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
  const categoryName = category?.name ?? 'Bez kategorii'
  const dateText = formatDatePL(expense.date)
  const amountText = formatCurrencyPLN(expense.amount)

  return (
    <tr>
      <td className="cellDate">{dateText}</td>
      <td className="cellCategory">
        <span className="categoryPill">
          <span
            className="categoryDot"
            aria-hidden="true"
            style={{ background: category?.color ?? 'var(--border)' }}
          />
          {categoryName}
        </span>
      </td>
      <td className="cellNote">{expense.note?.trim() ? expense.note : '—'}</td>
      <td className="cellAmount">{amountText}</td>
      <td className="cellActions">
        <button
          type="button"
          className="button buttonDanger"
          onClick={() => onDelete(expense.id)}
          aria-label={`Usuń wydatek: ${categoryName}, ${amountText}, ${dateText}`}
        >
          Usuń
        </button>
      </td>
    </tr>
  )
}

