import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react'

import type { Expense } from '../types/expense'

type ExpensesState = {
  expenses: Expense[]
}

type AddExpenseInput = Omit<Expense, 'id'>

type ExpensesAction =
  | { type: 'ADD_EXPENSE'; payload: { expense: AddExpenseInput } }
  | { type: 'DELETE_EXPENSE'; payload: { id: string } }
  | { type: 'UPDATE_EXPENSE'; payload: { expense: Expense } }
  | { type: 'SET_EXPENSES'; payload: { expenses: Expense[] } }

const initialState: ExpensesState = {
  expenses: [],
}

function expensesReducer(state: ExpensesState, action: ExpensesAction): ExpensesState {
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
  }
}

type ExpensesContextValue = {
  state: ExpensesState
  dispatch: Dispatch<ExpensesAction>
}

const ExpensesContext = createContext<ExpensesContextValue | null>(null)

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(expensesReducer, initialState)

  const value = useMemo(() => ({ state, dispatch }), [state])

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export function useExpenses() {
  const ctx = useContext(ExpensesContext)
  if (!ctx) throw new Error('useExpenses must be used within ExpenseProvider')
  return ctx
}

