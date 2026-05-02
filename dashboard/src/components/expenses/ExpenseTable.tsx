import { CATEGORIES } from '../../data/categories'
import { useExpenses } from '../../context/expenses'
import { ExpenseRow } from './ExpenseRow'

export function ExpenseTable() {
  const { state, dispatch } = useExpenses()

  return (
    <section className="card">
      <div className="cardHeader">
        <h2 className="cardTitle">Wydatki</h2>
        <div className="cardMeta">{state.expenses.length} pozycji</div>
      </div>
      <div className="tableWrap" role="region" aria-label="Tabela wydatków" tabIndex={0}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Data</th>
              <th scope="col">Kategoria</th>
              <th scope="col">Opis</th>
              <th scope="col" className="thRight">
                Kwota
              </th>
              <th scope="col" className="thRight">
                Akcje
              </th>
            </tr>
          </thead>
          <tbody>
            {state.expenses.length === 0 ? (
              <tr>
                <td colSpan={5} className="emptyState">
                  Brak wydatków. Dodaj pierwszy wpis w formularzu.
                </td>
              </tr>
            ) : (
              state.expenses.map((expense) => (
                <ExpenseRow
                  key={expense.id}
                  expense={expense}
                  category={CATEGORIES.find((c) => c.id === expense.categoryId)}
                  onDelete={(id) => dispatch({ type: 'DELETE_EXPENSE', payload: { id } })}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

