import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Inscription from './Inscription/Inscription.tsx'
import Connexion from './Connexion/Connexion.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Inscription />
  </React.StrictMode>,
)
