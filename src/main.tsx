import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppSettingsProvider } from './context/AppSettingsProvider.tsx'
import "./i18n";

createRoot(document.getElementById('root')!).render(
  <AppSettingsProvider>
    <StrictMode>
      <App />
    </StrictMode>,
  </AppSettingsProvider>
)
