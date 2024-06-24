import React from 'react';
import '../styles/Footer.css'; // Asegúrate de crear este archivo para estilos personalizados
import logo from '../assets/icono_pie_pagina.jpeg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
        <img src={logo} alt="Logo de la compañía" className="footer-image" />
        </div>
        <div className="footer-right">
          <p>&copy; {new Date().getFullYear()}Todos los derechos reservados.</p>
          <p>Dirección: Calle Falsa 123, Ciudad, País</p>
          <p>Teléfono: (123) 456-7890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer
