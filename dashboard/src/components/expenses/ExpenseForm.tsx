import { useMemo, useState } from 'react'

import { CATEGORIES } from '../../data/categories'
import { useExpenses } from '../../context/expenses'

function todayLocalISODate() {
  const now = new Date()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

type FormState = {
  amount: string
  date: string
  categoryId: string
  note: string
}

export function ExpenseForm() {
  const { dispatch } = useExpenses()

  const initial: FormState = useMemo(
    () => ({
      amount: '',
      date: todayLocalISODate(),
      categoryId: CATEGORIES[0]?.id ?? 'other',
      note: '',
    }),
    [],
  )

  const [form, setForm] = useState<FormState>(initial)
  const [error, setError] = useState<string | null>(null)

  function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const amount = Number(form.amount.replace(',', '.'))
    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Podaj poprawną kwotę większą od 0.')
      return
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.date)) {
      setError('Podaj poprawną datę.')
      return
    }
    if (!form.categoryId) {
      setError('Wybierz kategorię.')
      return
    }

    dispatch({
      type: 'ADD_EXPENSE',
      payload: {
        expense: {
          amount,
          currency: 'PLN',
          date: form.date,
          categoryId: form.categoryId,
          note: form.note.trim() || undefined,
        },
      },
    })

    setForm((prev) => ({ ...prev, amount: '', note: '', date: todayLocalISODate() }))
  }

  return (
    <section className="card">
      <div className="cardHeader">
        <h2 className="cardTitle">Dodaj wydatek</h2>
      </div>

      <form className="form" onSubmit={onSubmit} noValidate>
        <div className="formRow">
          <label className="field">
            <span className="fieldLabel">Kwota</span>
            <input
              className="input"
              inputMode="decimal"
              placeholder="np. 42,50"
              value={form.amount}
              onChange={(e) => onChange('amount', e.target.value)}
              aria-invalid={error ? true : undefined}
            />
          </label>

          <label className="field">
            <span className="fieldLabel">Data</span>
            <input
              className="input"
              type="date"
              value={form.date}
              onChange={(e) => onChange('date', e.target.value)}
            />
          </label>
        </div>

        <div className="formRow">
          <label className="field">
            <span className="fieldLabel">Kategoria</span>
            <select
              className="input"
              value={form.categoryId}
              onChange={(e) => onChange('categoryId', e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="fieldLabel">Opis</span>
            <input
              className="input"
              placeholder="np. Lidl, bilet, abonament…"
              value={form.note}
              onChange={(e) => onChange('note', e.target.value)}
            />
          </label>
        </div>

        {error ? (
          <div className="formError" role="alert">
            {error}
          </div>
        ) : null}

        <div className="formActions">
          <button type="submit" className="button buttonPrimary">
            Dodaj
          </button>
        </div>
      </form>
    </section>
  )
}

