import 'vite/modulepreload-polyfill'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import StateProvider from './context'
import App from './App'





ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>,
)
