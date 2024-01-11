import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const { redirect } = sessionStorage;
console.log('🚀 ~ redirect:', redirect);
delete sessionStorage.redirect;
// eslint-disable-next-line no-restricted-globals
if (redirect && redirect !== location.href) {
  console.log('🚀 ~ redirecting');
  // eslint-disable-next-line no-restricted-globals
  history.replaceState(null, '', redirect);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
