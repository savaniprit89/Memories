import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import { createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'


import { Provider } from 'react-redux';
import { reducers } from './reducers';
import {  applyMiddleware, compose } from 'redux';
import { legacy_createStore as createStore } from 'redux';
//const store =createStore(reducers,compose(applyMiddleware(thunk)))
const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>

  </React.StrictMode>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
