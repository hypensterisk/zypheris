/** @format */

import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/css/bootstrap.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App/index.jsx'

const domNode = document.getElementById('root')
const root = createRoot(domNode)
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
