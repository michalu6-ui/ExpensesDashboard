import { useContext } from 'react'

import { ExpensesContext } from './expensesContext'

export function useExpenses() {
  const ctx = useContext(ExpensesContext)
  if (!ctx) throw new Error('useExpenses must be used within ExpenseProvider')
  return ctx
}

