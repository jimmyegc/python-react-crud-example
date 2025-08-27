import { Link } from 'react-router-dom'
import { Logo } from './Logo'

export const Header = () => {
  return (
    <div className='bg-secondary'>
      <header className='h-16 bg-secondary text-white w-full max-w-5xl mx-auto'>
        <div className='flex justify-between p-4'>
          <Logo />
          <nav className='flex items-center justify-center'>
            <Link to="/" className='hover:text-primary'>Home</Link>
            <Link to="/about" className='ml-4 hover:text-primary'>About</Link>
            <Link to="/users" className='ml-4 hover:text-primary'>Users</Link>
          </nav>
        </div>
      </header>
    </div>
  )
}
