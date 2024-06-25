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

    const [usersList, setUserList] = useState([]);

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
                getUsers();
            } else {
                alert("Error al crear la cuenta");
            }
        }).catch(error => {
            console.error("Error:", error);
            alert("Error al crear la cuenta");
        });
    }

    const getUsers = () => {
        fetch("http://192.168.101.10:3000/api/usuarios", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            setUserList(response.data);
            alert("Usuarios obtenidos");
        });
    }

    getUsers()


    return (
       <div class='container'>
        <div className='App'>
           

            <div className='lista'>
                
                {
                    usersList.map((val,key) => {
                        return <div className=''> {val.Numero_de_Cedula} </div>; 
                    })
                }
            </div>
        </div>

            <div class="card text-center">
                <div class="card-header">
                    GESTION DE USUARIOS
                </div>
                <div className="card-body">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Numero De Cedula</span>
                    <input type="number" 
                    onChange={(event) => {
                        setNumeroDeCedula(event.target.value);
                    }}
                    className="form-control" placeholder="Numero De Cedula" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Primer Nombre</span>
                    <input type="text" 
                    onChange={(event) => {
                        setPrimerNombre(event.target.value);
                    }}
                    className="form-control" placeholder="Primer Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
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
                
            </div>
                
                <div class="card-footer-test-muted">
                <button className='btn btn-success' onClick={add}>Registrar</button>
                </div>
            </div>

        </div> 
    );
}

export default ViewUsers;
