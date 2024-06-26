import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login_user.css';
import { FaUser, FaLock } from 'react-icons/fa';

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://192.168.101.6:3000/api/usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Email: email,
          Contrasena: contrasena,
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert("Inicio de sesión exitoso");
        navigate(`/Subsidies/${encodeURIComponent(email)}`); // Redirige a Subsidies con el email en la URL
      } else {
        const errorData = await response.json();
        if (errorData.message === 'usuario no encontrado') {
          alert("Usuario no encontrado. Por favor, inténtalo de nuevo.");
        } else if (errorData.message === 'Contraseña incorrecta') {
          alert("Contraseña incorrecta. Por favor, inténtalo de nuevo.");
        } else {
          alert("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder='Correo'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FaUser className='icon'/>
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder='Contraseña'
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <FaLock className='icon' />
        </div>

        <div className="remember-forgot">
          <a href='/Contraseña'>¿Olvidó su contraseña?</a>
        </div>

        <button type="submit">Ingresar</button>
      </form>
     <br />
      <div className='remember-forgot'>
          <p>¿Todavía no tienes cuenta? <a href="/Registro">Ir a crearla</a></p>
        </div>

        <div className='remember-forgot'>
          <p>¿Quiere Ingresar Como Administrador? <a href="/Administrador">Ingresar</a></p>
        </div>
    </div>
  );
};

export default LoginUser;
