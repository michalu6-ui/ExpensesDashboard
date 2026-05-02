import type { ReactNode } from 'react'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app">
      <a className="skipLink" href="#main-content">
        Przejdź do treści
      </a>
      <header className="appHeader">
        <div className="appHeaderInner">
          <div className="brand">
            <h1 className="brandTitle">Wydatki</h1>
            <div className="brandSubtitle">Dashboard</div>
          </div>
        </div>
      </header>
      <main className="appMain" id="main-content" tabIndex={-1}>
        <div className="appMainInner">{children}</div>
      </main>
    </div>
  )
}

