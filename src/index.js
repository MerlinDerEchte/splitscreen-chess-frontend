import React from 'react';
import { HashRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';




console.log(process.env.PUBLIC_URL)

ReactDOM.render(
    <Router basename={process.env.PUBLIC_URL}>
            <App />
    </Router>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
