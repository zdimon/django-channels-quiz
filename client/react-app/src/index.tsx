import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Question} from './components/Question';
import {LoginForm} from './components/LoginForm';
import {SocketConnection} from './SocketConnection';

if(localStorage.getItem('username')) { 
    ReactDOM.render(
        <React.StrictMode>
          <Question />
        </React.StrictMode>,
        document.getElementById('#currentQuestionBlock')
      );
      var socket = new SocketConnection();
} else {
    ReactDOM.render(
        <React.StrictMode>
          <LoginForm />
        </React.StrictMode>,
        document.getElementById('#loginForm')
      );
}






  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
