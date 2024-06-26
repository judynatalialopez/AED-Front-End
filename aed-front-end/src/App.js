import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginUser from './components/login_user';
import RegisterUser from './components/register_user';
import Update_Password_u from './components/password_u';
import Subsidies from './components/sebsidies'; // Ajustado el nombre del componente
import LoginAdmin from './components/login_admin';
import ViewUsers from './components/view_users';
import ViewSubsidies from './components/view_subsidies';
import { Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route path="/Contraseña" element={<Update_Password_u />} />
          <Route path="/Registro" element={<RegisterUser />} />
          <Route path="/Subsidies/:email" element={<Subsidies />} />

          <Route path="/Administrador" element={<LoginAdmin />} />
          <Route path="/Crud_user" element={<ViewUsers />} />
          <Route path="/Crud_subsidies" element={<ViewSubsidies />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
