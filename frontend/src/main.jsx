import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryProvider } from './providers/QueryProvider.jsx'
import { ToastProvider } from './components/ui'
import App from './App.jsx'
//import './main.css'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </QueryProvider>
  </StrictMode>,
)











