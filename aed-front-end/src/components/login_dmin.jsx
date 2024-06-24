import React from 'react'; 
import '../styles/login_admin.css';
import { FaUser, FaLock } from 'react-icons/fa';

const LoginAdmin = () => {
  return (
    <div className="wrapper">
        <form action="">
            <h1>Iniciar Sesión</h1>
            <div className="input-box">
               <input type="text" placeholder='Correo' required /> 
               <FaUser className='icon'/>
            </div>
            <div className="input-box">
               <input type="password" placeholder='Contraseña' required /> 
               <FaLock className='icon' />
            </div>

            <div className="remember-forgot">
                <a href='#'> ¿olvido su contraseña?</a>
            </div>

           <button type="submit">Ingresar </button> 

           
        </form>
    </div>
  );
};

export default LoginAdmin;
