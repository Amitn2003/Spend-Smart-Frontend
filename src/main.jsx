import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'

import { AuthProvider } from './context/AuthContext.jsx';

import { registerSW } from 'virtual:pwa-register';

registerSW(); // Registers service worker

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>

     <BrowserRouter>
         <App />
      </BrowserRouter>
     </AuthProvider>
  </StrictMode>,
)
