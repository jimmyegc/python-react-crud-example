import { Header } from '../components/Header'

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen font-sans transition-colors duration-300">
  
      <Header />
      
      <main className="flex-1 p-5">
        {children}
      </main>

      <footer className="bg-bg text-text text-center p-3">
        <p>© 2025 - nmda solutions</p>
      </footer>
    </div>
  );
};
