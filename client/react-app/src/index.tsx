import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {Question} from './components/Question';
import {LoginForm} from './components/LoginForm';
import { MessageForm } from './components/MessageForm';
import { MessageBox } from './components/MessageBox';
import { CurrentPlayer } from './components/CurrentPlayer';
import { PlayerList } from './components/PlayerList';




if(localStorage.getItem('username')) { 
    console.log('init');
    ReactDOM.render(
        <React.StrictMode>
          <Question />
        </React.StrictMode>,
        document.getElementById('currentQuestionBlock')
      );
      ReactDOM.render(
        <React.StrictMode>
          <MessageForm />
        </React.StrictMode>,
        document.getElementById('messageFormBlock')
      );
      ReactDOM.render(
        <React.StrictMode>
          <MessageBox />
        </React.StrictMode>,
        document.getElementById('messageBox')
      );
      ReactDOM.render(
        <React.StrictMode>
          <CurrentPlayer />
        </React.StrictMode>,
        document.getElementById('currentPlayerBlock')
      );

      ReactDOM.render(
        <React.StrictMode>
          <PlayerList />
        </React.StrictMode>,
        document.getElementById('playerListBlock')
      );
      
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
