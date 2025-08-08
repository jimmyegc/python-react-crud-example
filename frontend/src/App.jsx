import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Home } from '../src/components/Home'
import { About } from '../src/components/About'
import { Users } from '../src/components/Users'

function App() {
  
  return (
    <BrowserRouter>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/users">Users</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about"element={<About />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
