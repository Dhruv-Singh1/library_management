import React from 'react'
import './App.css';
import Login from "./Login/Login"
import Register from './Register/Register';
import User from './User/User';
import Admin from './Admin/Admin'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element = {<Login/>} />
            <Route path='/register' element= {<Register/>} />
            <Route path='/user' element= {<User/>} />
            <Route path='/admin' element= {<Admin/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
