import React from 'react';
import '../styles/register_user.css';  
import { FaUser, FaLock, FaPhoneAlt, FaMoneyCheckAlt, FaAddressBook } from 'react-icons/fa';
import { HiIdentification } from 'react-icons/hi';
import { MdEmail } from "react-icons/md";
import { BsFillCalendarDateFill } from "react-icons/bs";


const Register_User = () => {
   return (
    <div className="wrapper">
        <form action="">
            <h1>Registro</h1>
            <div className="input-box">
               <input type="number" placeholder='Numero de Cedula' required /> 
               <HiIdentification className='icon'/>
            </div>

            <div className="input-box">
               <input type="text" placeholder='Primero Nombre' required /> 
               <FaUser className='icon'/>
            </div>

            <div className="input-box">
               <input type="Text" placeholder='Segundo Nombre' required /> 
               <FaUser className='icon' />
            </div>

            <div className="input-box">
               <input type="text" placeholder='Primero Apellido' required /> 
               <FaUser className='icon'/>
            </div>

            <div className="input-box">
               <input type="Text" placeholder='Segundo Apellido' required /> 
               <FaUser className='icon' />
            </div>
            
            <div className="input-box">
               <input type="number" placeholder='Telefono' required /> 
               <FaPhoneAlt className='icon' />
            </div>
            <div className="input-box">
               <input type="email" placeholder='Correo Electronico' required /> 
               <MdEmail className='icon'/>
            </div>
            <div className="input-box">
               <input type="numeric" placeholder='Numero De Cuenta Ahorros' required /> 
               <FaMoneyCheckAlt className='icon' />
            </div>
            <div className="input-box">
               <input type="text" placeholder='Direccion' required /> 
               <FaAddressBook className='icon'/>
            </div>
            <div className="input-box">
               <input type="Text" placeholder='Fecha De Nacimiento' required /> 
               <BsFillCalendarDateFill className='icon' />
            </div>
            <div className="input-box">
               <input type="password" placeholder='Contraseña' required /> 
               <FaLock className='icon' />
            </div>

           

           <button type="submit">Crear Cuenta</button> 

           <div className='register-link'>
            <p>¿Quiere volver al inicio? <a href="#">Volver al inicio</a></p>
           </div>
        </form>
    </div>
  );
};


export default Register_User;