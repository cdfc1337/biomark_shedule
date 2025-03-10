// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // This line should point to the App component correctly.
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
