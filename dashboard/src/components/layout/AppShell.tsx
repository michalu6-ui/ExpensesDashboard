import type { ReactNode } from 'react'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app">
      <header className="appHeader">
        <div className="appHeaderInner">
          <div className="brand">
            <div className="brandTitle">Wydatki</div>
            <div className="brandSubtitle">Dashboard</div>
          </div>
        </div>
      </header>
      <main className="appMain">
        <div className="appMainInner">{children}</div>
      </main>
    </div>
  )
}

