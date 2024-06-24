import React from 'react';  // Asegúrate de usar la ruta correcta
import '../styles/login_user.css';
import { FaUser, FaLock } from 'react-icons/fa';

const LoginUser = () => {
  return (
    <div className="wrapper">
        <form action="">
            <h1>Iniciar Sesión</h1>
            <div className="input-box">
               <input type="text" placeholder='correo' required /> 
               <FaUser className='icon'/>
            </div>
            <div className="input-box">
               <input type="password" placeholder='contraseña' required /> 
               <FaLock className='icon' />
            </div>

            <div className="remember-forgot">
                <label><input type="checkbox"/>Recordar</label>
                <a href='#'> ¿olvido su contraseña?</a>
            </div>

           <button type="submit">Ingresar </button> 

           <div className='register-link'>
            <p>¿No tiene una cuenta? <a href="#">Cree Una Cuenta</a></p>
           </div>
        </form>
    </div>
  );
};

export default LoginUser
