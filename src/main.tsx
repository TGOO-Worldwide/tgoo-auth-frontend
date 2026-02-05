import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('main.tsx executing');

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
