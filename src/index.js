import React from 'react';
import { createRoot } from 'react-dom/client';
import "./index.css"
import App from './app.jsx'; // Import your main application component

// Get the root DOM element where your React app will be mounted
const container = document.getElementById('root');

// Create a root for your React application
const root = createRoot(container);

// Render your main application component into the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

