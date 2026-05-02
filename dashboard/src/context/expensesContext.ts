import { createContext, type Dispatch } from 'react'

import type { Expense } from '../types/expense'

export type ExpensesState = {
  expenses: Expense[]
}

export type AddExpenseInput = Omit<Expense, 'id'>

export type ExpensesAction =
  | { type: 'ADD_EXPENSE'; payload: { expense: AddExpenseInput } }
  | { type: 'DELETE_EXPENSE'; payload: { id: string } }
  | { type: 'UPDATE_EXPENSE'; payload: { expense: Expense } }
  | { type: 'SET_EXPENSES'; payload: { expenses: Expense[] } }

export const STORAGE_KEY = 'expenses.dashboard.v1'

export const initialState: ExpensesState = {
  expenses: [],
}

export function isExpense(value: unknown): value is Expense {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  return (
    typeof v.id === 'string' &&
    typeof v.amount === 'number' &&
    v.currency === 'PLN' &&
    typeof v.date === 'string' &&
    typeof v.categoryId === 'string' &&
    (typeof v.note === 'string' || typeof v.note === 'undefined')
  )
}

export function expensesReducer(state: ExpensesState, action: ExpensesAction): ExpensesState {
  switch (action.type) {
    case 'ADD_EXPENSE': {
      const id = crypto.randomUUID()
      const next: Expense = { id, ...action.payload.expense }
      return { expenses: [next, ...state.expenses] }
    }
    case 'DELETE_EXPENSE': {
      return { expenses: state.expenses.filter((e) => e.id !== action.payload.id) }
    }
    case 'UPDATE_EXPENSE': {
      return {
        expenses: state.expenses.map((e) =>
          e.id === action.payload.expense.id ? action.payload.expense : e,
        ),
      }
    }
    case 'SET_EXPENSES': {
      return { expenses: action.payload.expenses }
    }
    default: {
      return state
    }
  }
}

export type ExpensesContextValue = {
  state: ExpensesState
  dispatch: Dispatch<ExpensesAction>
}

export const ExpensesContext = createContext<ExpensesContextValue | null>(null)
