export function formatCurrencyPLN(value: number) {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatDatePL(value: string) {
  const dt = new Date(value)
  return new Intl.DateTimeFormat('pl-PL', { dateStyle: 'medium' }).format(dt)
}

