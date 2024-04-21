import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './auth/login';
import Subject from './subject';

import {AuthProvider} from './auth/authcontext'; 
import Home from './home';
function App() {
  return (
    <div className="App">
       <Router>
             <AuthProvider>  
              <Routes>
                <Route path="/" Component={Home}/>
                <Route path="/login" Component={Login}/>
                <Route path="/:subjectname" Component={Subject}/>
              </Routes>
              </AuthProvider>
          </Router>
    </div>
  );
}

export default App;
