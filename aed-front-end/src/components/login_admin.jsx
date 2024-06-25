import React, { useState } from 'react';
import '../styles/login_admin.css';
import { FaUser, FaLock } from 'react-icons/fa';

const LoginAdmin = () => {
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
        // Aquí podrías redirigir al usuario si es necesario
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
          <a href='#'>¿Olvidó su contraseña?</a>
        </div>

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default LoginAdmin;
