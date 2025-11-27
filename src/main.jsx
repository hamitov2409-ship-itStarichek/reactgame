import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

async function enableMocks() {
    if (process.env.NODE_ENV === 'development') {
        const { worker } = await import('./api/mocks/browser')
        return worker.start()
    }
    return Promise.resolve()
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
