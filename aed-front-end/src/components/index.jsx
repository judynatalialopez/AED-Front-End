import React from 'react';
import Footer from './footer'; // Asumiendo que el nombre del archivo del componente Footer es Footer.jsx
import '../styles/index.css'; // Importa tus estilos globales

const Index = () => {
  return (
    <div className='Inicio'>
      <div>Esta es la página de inicio</div>

      <Footer />
    </div>
  );
};

export default Index;
