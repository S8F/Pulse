/**
 * Application bootstrap.
 * Initialises the MSW service worker for mock API interception,
 * then mounts the React app into the DOM inside StrictMode.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/globals.css'

async function enableMocking() {
  const { worker } = await import('./api/mock-server')
  return worker.start({ onUnhandledRequest: 'bypass' })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
