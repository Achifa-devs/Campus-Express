import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import { Provider } from 'react-redux';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router } from 'react-router-dom';
import store from './redux/store';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
      <HelmetProvider>
        <Router>
          <App /> 
        </Router>
      </HelmetProvider>
    </Provider>
 
);
// michTheBrandofficial
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
