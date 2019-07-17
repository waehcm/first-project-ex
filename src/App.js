import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/Navbar.component';
import Langding from './components/Landing.component';
import Login from './components/Login.component';
import Register from './components/Register.component';
import Profile from './components/Profile.component';


function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Navbar />
          <Route exact path="/" component={Langding} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
          </div>
        </div>
      </div>
    </Router>

  );
}

export default App;
