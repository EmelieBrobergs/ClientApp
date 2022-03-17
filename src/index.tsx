import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; //TODO: Ta bort / se över !
import App from './App';
import reportWebVitals from './reportWebVitals'; // TODO: Läs på / se över / ta bort ?
import ErrorBoundary from './components/basicRouting/errorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux"
import store from './app/store';

ReactDOM.render(
  <React.StrictMode>
     <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
