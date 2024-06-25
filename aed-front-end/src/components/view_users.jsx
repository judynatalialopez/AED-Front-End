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

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Segundo Nombre</span>
                    <input type="text" 
                    onChange={(event) => {
                        setSegundoNombre(event.target.value);
                    }}
                    className="form-control" placeholder="Segundo Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Primer Apellido</span>
                    <input type="text" 
                    onChange={(event) => {
                        setPrimerApellido(event.target.value);
                    }}
                    className="form-control" placeholder="Primer Apellido" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Segundo Apellido</span>
                    <input type="text" 
                    onChange={(event) => {
                        setSegundoApellido(event.target.value);
                    }}
                    className="form-control" placeholder="Segundo Apellido" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Email</span>
                    <input type="text" 
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                    className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Fecha De Nacimiento</span>
                    <input type="date" 
                    onChange={(event) => {
                        setFechaDeNacimiento(event.target.value);
                    }}
                    className="form-control" placeholder="Fecha De Nacimiento" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Direccion</span>
                    <input type="text" 
                    onChange={(event) => {
                        setDireccion(event.target.value);
                    }}
                    className="form-control" placeholder="Direccion" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
               
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Telefono</span>
                    <input type="number" 
                    onChange={(event) => {
                        setTelefono(event.target.value);
                    }}
                    className="form-control" placeholder="Telefono" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Numero De Cuenta</span>
                    <input type="number" 
                    onChange={(event) => {
                        setNumeroDeCuenta(event.target.value);
                    }}
                    className="form-control" placeholder="Numero De Cuenta" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Estado</span>
                    <input type="number" 
                   onChange={(event) => {
                    setEstado(event.target.value);
                }}
                    className="form-control" placeholder="Estado" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                 
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Contraseña</span>
                    <input type="password" 
                   onChange={(event) => {
                    setContrasena(event.target.value);
                }}
                    className="form-control" placeholder="Contraseña" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>                
                
            </div>
                
                <div class="card-footer-test-muted">
                <button className='btn btn-success' onClick={add}>Registrar</button>
                </div>
            </div>

            <table class="table table-striped">
                ...
                </table>


        </div> 
    );
}

export default ViewUsers;
