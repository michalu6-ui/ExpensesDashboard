import { useMemo } from 'react'

import { CATEGORIES } from '../../data/categories'
import { useExpenses } from '../../context/expenses'
import { totalsByCategory, totalsByDay, resolveCategory } from '../../utils/aggregate'
import { ExpensesByCategoryChart } from './ExpensesByCategoryChart'
import { ExpensesOverTimeChart } from './ExpensesOverTimeChart'

export function ChartsSection() {
  const { state } = useExpenses()

  const byCategory = useMemo(() => totalsByCategory(state.expenses), [state.expenses])
  const byDay = useMemo(() => totalsByDay(state.expenses), [state.expenses])

  const categoryLabels = useMemo(
    () => byCategory.map((x) => resolveCategory(CATEGORIES, x.categoryId)?.name ?? '—'),
    [byCategory],
  )
  const categoryValues = useMemo(() => byCategory.map((x) => x.total), [byCategory])
  const categoryColors = useMemo(
    () =>
      byCategory.map((x) => resolveCategory(CATEGORIES, x.categoryId)?.color ?? 'var(--border)'),
    [byCategory],
  )

  return (
    <section className="chartGrid">
      <div className="card">
        <div className="cardHeader">
          <h2 className="cardTitle">Kategorie</h2>
          <div className="cardMeta">Suma wydatków</div>
        </div>
        <div className="chartBody">
          {state.expenses.length === 0 ? (
            <div className="placeholderBody">Dodaj wydatek, aby zobaczyć wykres.</div>
          ) : (
            <ExpensesByCategoryChart
              labels={categoryLabels}
              values={categoryValues}
              colors={categoryColors}
            />
          )}
        </div>
      </div>

      <div className="card">
        <div className="cardHeader">
          <h2 className="cardTitle">W czasie</h2>
          <div className="cardMeta">Suma dzienna</div>
        </div>
        <div className="chartBody">
          {state.expenses.length === 0 ? (
            <div className="placeholderBody">Dodaj wydatek, aby zobaczyć wykres.</div>
          ) : (
            <ExpensesOverTimeChart labels={byDay.labels} values={byDay.values} />
          )}
        </div>
      </div>
    </section>
  )
}

