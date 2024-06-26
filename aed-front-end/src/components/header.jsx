import React from 'react';
import '../styles/header.css'; // Asegúrate de importar tus estilos CSS
import logo from '../assets/logo.jpeg';
import { Container } from 'react-bootstrap'; // Importa el componente Container de Bootstrap

const Header = () => {
  return (
    <div className="header-container">
      <Container fluid>
        <div className="d-flex justify-content-end align-items-center">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
      </Container>
    </div>
  );
};

export default Header;
