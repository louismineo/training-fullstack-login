import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import store from './store/store.ts'
import { Provider } from 'react-redux'

/*
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store = {store}>
    <App />
    </Provider>
  </StrictMode>,
)
*/

// REMOVED STRICT MODE, so that the components dont re-run unnecessarily
createRoot(document.getElementById('root')!).render(
    <Provider store = {store}>
    <App />
    </Provider>
)

