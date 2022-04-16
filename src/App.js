// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
import React, {useState} from "react";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import News from "./core/News";
import Fetch from "./core/Fetch";
import MainNavigation from "./nav/MainNavigation";
import Layout from "./nav/Layout";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Expense from "./core/Expense";
import Tips from "./core/Tips";
import ReactFirebaseFileUpload from "./core/Trial";

const App = () => {

    return(

        <Router>
            <MainNavigation/>
            <main>
                <Routes>
                    <Route path='/' element={<News/>} exact />
                    <Route path='/news' element={<News/>} />
                    <Route path='/expense' element={<Expense/>} />
                    <Route path='/tips' element={<Tips/>} />
                    <Route path='/questions' element={<Fetch/>} />
                </Routes>
            </main>


        </Router>
    )

}
export default App;
