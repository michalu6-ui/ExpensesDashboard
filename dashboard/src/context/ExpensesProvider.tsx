import { useEffect, useMemo, useReducer, type ReactNode } from 'react'

import {
  ExpensesContext,
  STORAGE_KEY,
  expensesReducer,
  initialState,
  isExpense,
} from './expensesContext'

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(expensesReducer, initialState)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed: unknown = JSON.parse(raw)
      if (!Array.isArray(parsed)) return
      const expenses = parsed.filter(isExpense)
      dispatch({ type: 'SET_EXPENSES', payload: { expenses } })
    } catch {
      // ignore invalid storage
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.expenses))
    } catch {
      // ignore storage failures
    }
  }, [state.expenses])

  const value = useMemo(() => ({ state, dispatch }), [state])

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

