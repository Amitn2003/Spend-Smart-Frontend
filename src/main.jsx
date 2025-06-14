import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'

import { AuthProvider } from './context/AuthContext.jsx';

// import { registerSW } from 'virtual:pwa-register';

// registerSW(); // Registers service worker

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(reg => console.log("✅ Service Worker registered:", reg.scope))
      .catch(err => console.error("❌ Service Worker registration failed:", err));
  });
}




createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>

     <BrowserRouter>
         <App />
      </BrowserRouter>
     </AuthProvider>
  </StrictMode>,
)
