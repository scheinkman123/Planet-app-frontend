import React, { useState } from "react";
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";
import { HomePage } from "./HomePage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {/* {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      } */}
      <BrowserRouter>
      <Routes>
      <Route path='/' element={currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />} />
      <Route path='/home/:userId' element={<HomePage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
