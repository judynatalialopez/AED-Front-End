import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login_user.css';
import { FaUser, FaLock } from 'react-icons/fa';

const LoginAdmin = () => {
  const navigate = useNavigate(); // Importante: asegúrate de importar useNavigate correctamente
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://192.168.101.6:3000/api/administrador/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          contrasena: contrasena,
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert("Inicio de sesión exitoso");
        navigate('/Crud_subsidies'); // Redirige a la página de inicio
      } else {
        alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar Sesión Administrador</h1>
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
             <br />
             <br />
      <div className='remember-forgot'>
          <p><a href="/">Volver al inicio</a></p>
        </div>
      </form>
    </div>
  );
};

export default LoginAdmin;
