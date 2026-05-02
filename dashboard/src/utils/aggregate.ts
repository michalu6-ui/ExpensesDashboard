import type { Category } from '../types/category'
import type { Expense } from '../types/expense'

export type CategoryTotal = {
  categoryId: string
  total: number
}

export function totalsByCategory(expenses: Expense[]): CategoryTotal[] {
  const map = new Map<string, number>()
  for (const e of expenses) {
    map.set(e.categoryId, (map.get(e.categoryId) ?? 0) + e.amount)
  }
  return Array.from(map, ([categoryId, total]) => ({ categoryId, total })).sort(
    (a, b) => b.total - a.total,
  )
}

export function totalsByDay(expenses: Expense[]) {
  const map = new Map<string, number>()
  for (const e of expenses) {
    // `date` is YYYY-MM-DD
    map.set(e.date, (map.get(e.date) ?? 0) + e.amount)
  }
  const labels = Array.from(map.keys()).sort()
  const values = labels.map((d) => map.get(d) ?? 0)
  return { labels, values }
}

export function resolveCategory(categories: Category[], categoryId: string) {
  return categories.find((c) => c.id === categoryId)
}

