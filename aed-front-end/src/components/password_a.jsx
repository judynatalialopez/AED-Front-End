import React from 'react';  // Asegúrate de usar la ruta correcta
import '../styles/password_a.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { HiIdentification } from 'react-icons/hi';

const Update_Password_a= () => {
  return (
    <div className="wrapper">
        <form action="">
            <h1>Cambiar Contraseña</h1>
            <div className="input-box">
               <input type="number" placeholder='Numero de Cedula' required /> 
               <HiIdentification className='icon'/>
            </div>
            <div className="input-box">
               <input type="text" placeholder='correo' required /> 
               <FaUser className='icon'/>
            </div>
            <div className="input-box">
               <input type="password" placeholder='Nueva Contraseña' required /> 
               <FaLock className='icon' />
            </div>

           <button type="submit">Cambiar Contraseña </button> 

           <div className='register-link'>
           <p>¿Quiere volver al inicio? <a href="#">Volver al inicio</a></p>
           </div>
        </form>
    </div>
  );
};

export default Update_Password_a;