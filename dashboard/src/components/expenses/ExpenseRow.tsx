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
  const isCategoryMissing = !category?.name
  const categoryNameForAria = category?.name ?? 'Bez kategorii'
  const categoryNameForUi = category?.name ?? '—'
  const dateText = formatDatePL(expense.date)
  const amountText = formatCurrencyPLN(expense.amount)

  return (
    <tr>
      <td className="cellDate">{dateText}</td>
      <td className="cellCategory">
        <span className="categoryPill" aria-label={isCategoryMissing ? categoryNameForAria : undefined}>
          <span
            className="categoryDot"
            aria-hidden="true"
            style={{ background: category?.color ?? 'var(--border)' }}
          />
          <span aria-hidden={isCategoryMissing ? 'true' : undefined}>{categoryNameForUi}</span>
        </span>
      </td>
      <td className="cellNote">{expense.note?.trim() ? expense.note : '—'}</td>
      <td className="cellAmount">{amountText}</td>
      <td className="cellActions">
        <button
          type="button"
          className="button buttonDanger"
          onClick={() => onDelete(expense.id)}
          aria-label={`Usuń wydatek: ${categoryNameForAria}, ${amountText}, ${dateText}`}
        >
          Usuń
        </button>
      </td>
    </tr>
  )
}

