import './chartSetup'

import { Pie } from 'react-chartjs-2'

export function ExpensesByCategoryChart({
  labels,
  values,
  colors,
}: {
  labels: string[]
  values: number[]
  colors: string[]
}) {
  return (
    <Pie
      data={{
        labels,
        datasets: [
          {
            label: 'Suma',
            data: values,
            backgroundColor: colors,
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 0,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: { mode: 'index', intersect: false },
        },
      }}
    />
  )
}

