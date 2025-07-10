import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom';
import './globals.css'

const rootElement = document.getElementById('root')!;
ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
);
