import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@/components/ThemeProvider'
import { getPerformance } from "firebase/performance";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="squirrel-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>,
)
