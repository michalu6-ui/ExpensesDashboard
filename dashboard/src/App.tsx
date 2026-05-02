import './App.css'

import { AppShell } from './components/layout/AppShell'
import { ExpenseForm } from './components/expenses/ExpenseForm'
import { ExpenseTable } from './components/expenses/ExpenseTable'
import { ChartsSection } from './components/charts/ChartsSection'

function App() {
  return (
    <AppShell>
      <div className="dashboard">
        <div className="dashboardTop">
          <ChartsSection />
        </div>

        <div className="dashboardBottom">
          <ExpenseTable />
          <ExpenseForm />
        </div>
      </div>
    </AppShell>
  )
}

export default App
