import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app';
//firbase config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZ_focOHsJGQqfb_XDWtsC3VjZq6yDndA",
    authDomain: "farmtrack-44344.firebaseapp.com",
    projectId: "farmtrack-44344",
    storageBucket: "farmtrack-44344.appspot.com",
    messagingSenderId: "848697202838",
    appId: "1:848697202838:web:7f92737773aa83ad0e4ab7",
    measurementId: "G-20Q95LJQK1"
};
//initialize
firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
