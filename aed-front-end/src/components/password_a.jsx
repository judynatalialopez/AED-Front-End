import React, { useState } from 'react';
import '../styles/password_a.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { HiIdentification } from 'react-icons/hi';

const Update_Password_a = () => {
    const [Numero_de_Cedula, setNumeroDeCedula] = useState('');
    const [NuevaContrasena, setNuevaContrasena] = useState('');
    const [Email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            contrasena: NuevaContrasena
        };

        // Construir la URL de la API con el ID dinámico
        const url = `http://192.168.101.6:3000/api/administrador/updatePassword/${Numero_de_Cedula}`;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message); // Mostrar mensaje de éxito usando alert
            } else {
                const errorData = await response.json();
                alert(errorData.message); // Mostrar mensaje de error usando alert
            }
        } catch (error) {
            console.error('Error al actualizar la contraseña:', error);
            alert('Error al actualizar la contraseña'); // Mostrar mensaje de error genérico usando alert
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Cambiar Contraseña</h1>
                <div className="input-box">
                    <input
                        type="number"
                        placeholder="Numero de Cedula"
                        value={Numero_de_Cedula}
                        onChange={(e) => setNumeroDeCedula(e.target.value)}
                        required
                    />
                    <HiIdentification className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Correo"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Nueva Contraseña"
                        value={NuevaContrasena}
                        onChange={(e) => setNuevaContrasena(e.target.value)}
                        required
                    />
                    <FaLock className="icon" />
                </div>

                <button type="submit">Cambiar Contraseña</button>

                <div className="register-link">
                    <p>
                        ¿Quiere volver al inicio? <a href="#">Volver al inicio</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Update_Password_a;
