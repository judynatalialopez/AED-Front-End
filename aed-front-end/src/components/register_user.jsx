import React, { useState } from 'react';
import '../styles/register_user.css';
import { FaUser, FaLock, FaPhoneAlt, FaMoneyCheckAlt, FaAddressBook } from 'react-icons/fa';
import { HiIdentification } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { GiMatterStates } from "react-icons/gi";

const RegisterUser = () => {

    const [numeroDeCedula, setNumeroDeCedula] = useState("");
    const [primerNombre, setPrimerNombre] = useState("");
    const [segundoNombre, setSegundoNombre] = useState("");
    const [primerApellido, setPrimerApellido] = useState("");
    const [segundoApellido, setSegundoApellido] = useState("");
    const [email, setEmail] = useState("");
    const [fechaDeNacimiento, setFechaDeNacimiento] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [numeroDeCuenta, setNumeroDeCuenta] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [estado, setEstado] = useState("");

    const add = (event) => {
        event.preventDefault();
        fetch("http://192.168.101.6:3000/api/usuario/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Numero_de_Cedula: numeroDeCedula,
                Primer_Nombre: primerNombre,
                Segundo_Nombre: segundoNombre,
                Primer_Apellido: primerApellido,
                Segundo_Apellido: segundoApellido,
                Email: email,
                Fecha_de_Nacimiento: fechaDeNacimiento,
                Direccion: direccion,
                Telefono: telefono,
                Numero_de_Cuenta_Ahorro: numeroDeCuenta,
                Contrasena: contrasena,
                Estado: estado
            })
        }).then(response => {
            if (response.ok) {
                alert("Cuenta Creada");
            } else {
                alert("Error al crear la cuenta");
            }
        }).catch(error => {
            console.error("Error:", error);
            alert("Error al crear la cuenta");
        });
    };

    return (
        <div className="wrapper">
            <form onSubmit={add}>
                <h1>Registro</h1>
                <div className="input-box">
                    <input onChange={(event) => setNumeroDeCedula(event.target.value)}
                        type="number" placeholder='Numero de Cedula' required />
                    <HiIdentification className='icon' />
                </div>

                <div className="input-box">
                    <input onChange={(event) => setPrimerNombre(event.target.value)}
                        type="text" placeholder='Primer Nombre' required />
                    <FaUser className='icon' />
                </div>

                <div className="input-box">
                    <input onChange={(event) => setSegundoNombre(event.target.value)}
                        type="text" placeholder='Segundo Nombre' required />
                    <FaUser className='icon' />
                </div>

                <div className="input-box">
                    <input onChange={(event) => setPrimerApellido(event.target.value)}
                        type="text" placeholder='Primer Apellido' required />
                    <FaUser className='icon' />
                </div>

                <div className="input-box">
                    <input onChange={(event) => setSegundoApellido(event.target.value)}
                        type="text" placeholder='Segundo Apellido' required />
                    <FaUser className='icon' />
                </div>

                <div className="input-box">
                    <input onChange={(event) => setTelefono(event.target.value)}
                        type="number" placeholder='Telefono' required />
                    <FaPhoneAlt className='icon' />
                </div>

                <div className="input-box">
                    <input onChange={(event) => setEmail(event.target.value)}
                        type="email" placeholder='Correo Electronico' required />
                    <MdEmail className='icon' />
                </div>

                <div className="input-box">
                    <input onChange={(event) => setNumeroDeCuenta(event.target.value)}
                        type="number" placeholder='Numero De Cuenta Ahorros' required />
                    <FaMoneyCheckAlt className='icon' />
                </div>

                <div className="input-box">
                    <input onChange={(event) => setDireccion(event.target.value)}
                        type="text" placeholder='Direccion' required />
                    <FaAddressBook className='icon' />
                </div>

                <div className="input-box">
                    <input onChange={(event) => setFechaDeNacimiento(event.target.value)}
                        type="date" placeholder='Fecha De Nacimiento' required />
                    <date className='icon' />
                </div>

                <div className="input-box">
                    <input onChange={(event) => setEstado(event.target.value)}
                        type="text" placeholder='Estado' />
                    <GiMatterStates className='icon' />
                </div>

                <div className="input-box">
                    <input onChange={(event) => setContrasena(event.target.value)}
                        type="password" placeholder='Contraseña' required />
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

export default RegisterUser;
