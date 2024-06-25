import React, { useState } from 'react'; 
import '../styles/view_user.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';

function ViewUsers() {

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

    const add = () => {
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
        <div className='datos'>
            <label>Numero De Cedula: <input 
            onChange={(event) => {
                setNumeroDeCedula(event.target.value);
            }}
            type="number" value={numeroDeCedula} /></label> 
            <label>Primer Nombre: <input 
            onChange={(event) => {
                setPrimerNombre(event.target.value);
            }}
            type="text" value={primerNombre} /></label> 
            <label>Segundo Nombre: <input 
            onChange={(event) => {
                setSegundoNombre(event.target.value);
            }}
            type="text" value={segundoNombre} /></label> 
            <label>Primer Apellido: <input 
            onChange={(event) => {
                setPrimerApellido(event.target.value);
            }}
            type="text" value={primerApellido} /></label> 
            <label>Segundo Apellido: <input 
            onChange={(event) => {
                setSegundoApellido(event.target.value);
            }}
            type="text" value={segundoApellido} /></label>              
            <label>Email: <input 
            onChange={(event) => {
                setEmail(event.target.value);
            }}
            type="email" value={email} /></label> 
            <label>Fecha De Nacimiento: <input 
            onChange={(event) => {
                setFechaDeNacimiento(event.target.value);
            }}
            type="date" value={fechaDeNacimiento} /></label> 
            <label>Direccion: <input 
            onChange={(event) => {
                setDireccion(event.target.value);
            }}
            type="text" value={direccion} /></label> 
            <label>Telefono: <input
            onChange={(event) => {
                setTelefono(event.target.value);
            }}
            type="number" value={telefono} /></label> 
            <label>Numero De Cuenta: <input 
            onChange={(event) => {
                setNumeroDeCuenta(event.target.value);
            }}
            type="number" value={numeroDeCuenta} /></label> 
            <label>Contraseña: <input 
            onChange={(event) => {
                setContrasena(event.target.value);
            }}
            type="password" value={contrasena} /></label>
            <label>Estado: <input 
            onChange={(event) => {
                setEstado(event.target.value);
            }}
            type="text" value={estado} /></label>  
            <button onClick={add}>Registrar</button>
        </div>
    );
}

export default ViewUsers;
