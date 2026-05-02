import {
  createContext,
  useContext,
  useEffect,
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

const STORAGE_KEY = 'expenses.dashboard.v1'

const initialState: ExpensesState = {
  expenses: [],
}

function isExpense(value: unknown): value is Expense {
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
    default: {
      return state
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

export function useExpenses() {
  const ctx = useContext(ExpensesContext)
  if (!ctx) throw new Error('useExpenses must be used within ExpenseProvider')
  return ctx
}

