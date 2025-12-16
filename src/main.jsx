import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import './i18n.js'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <ToastContainer />
    </ThemeProvider>
  </StrictMode>
)
