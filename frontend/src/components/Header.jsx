import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import Button from './ui/Button/Button'

export const Header = () => {
  return (
    <header className='bg-[var(--nmda-card)]'>

    <nav className="max-w-5xl mx-auto bg-[var(--nmda-card)] border-b border-[var(--nmda-border)] flex items-center justify-between px-6 py-4">
      <h1 className="text-xl font-bold text-[var(--nmda-primary)]">
        nmda
      </h1>
      
      <nav className='flex items-center justify-center text-black dark:text-white '>
            <Link to="/" className='hover:text-[var(--nmda-primary)]'>Home</Link>
            <Link to="/about" className='ml-4 hover:text-[var(--nmda-primary)]'>About</Link>
            <Link to="/users" className='ml-4 hover:text-[var(--nmda-primary)]'>Users</Link>
          </nav>
          <Button             
            onClick={() => {
        const html = document.documentElement;
        html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
      }}>🌞 - 🌙</Button>
    </nav>
    </header>
  )
}
