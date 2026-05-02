import './chartSetup'

import { Line } from 'react-chartjs-2'

export function ExpensesOverTimeChart({
  labels,
  values,
}: {
  labels: string[]
  values: number[]
}) {
  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: 'Wydatki',
            data: values,
            borderColor: 'rgba(170, 59, 255, 0.9)',
            backgroundColor: 'rgba(170, 59, 255, 0.18)',
            fill: true,
            tension: 0.25,
            pointRadius: 3,
            pointHoverRadius: 5,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { mode: 'index', intersect: false },
        },
        scales: {
          x: { grid: { display: false } },
          y: { ticks: { precision: 0 } },
        },
      }}
    />
  )
}

