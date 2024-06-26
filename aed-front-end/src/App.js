import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginUser from './components/login_user';
import RegisterUser from './components/register_user';
import Update_Password_u from './components/password_u';
import ViewUsers from './components/view_users';
import './App.css'; // Asegúrate de que la carpeta se llama 'components' y el archivo 'update_password_a.js'
import { Navbar } from 'react-bootstrap';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route path="/Contraseña" element={<Update_Password_u />} />
          <Route path="/Registro" element={<RegisterUser />} />
          <Route path="/Inicio" element={<ViewUsers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
