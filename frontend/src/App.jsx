import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { UsersPage } from './pages/UsersPage'
import { Logo } from './components/Logo'
import { Container } from './components/ui'
import { Layout } from "./layouts/Layout";

function App() {
  const [open, setOpen] = useState(true);

  return (
    <BrowserRouter>
      <Layout>
        <Container size="lg">
          {/* Header */}
          {/*           <header className="layout-header">
            <button className="menu-btn" onClick={() => setOpen(!open)}>
              ☰
            </button>
            <h1 className="logo">Mi App</h1>
          </header>
          
          <div className="layout-body">            
            <aside className={`sidebar ${open ? "open" : "collapsed"}`}>
              <nav>
                <ul>
                  <li><a href="/">🏠 Inicio</a></li>
                  <li><a href="/dashboard">📊 Dashboard</a></li>
                  <li><a href="/config">⚙️ Configuración</a></li>
                </ul>
              </nav>
            </aside>            
            <main className="layout-main">
              <Container size="lg">hola</Container>
            </main>
          </div> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </Container>
      </Layout>
    </BrowserRouter>
  )
}

export default App
