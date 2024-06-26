import React, { useState, useEffect } from 'react'; 
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

    useEffect(() => {
        getUsers();
    }, []);

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
        fetch("http://192.168.101.6:3000/api/usuarios", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    return (
        <div className='container'>
            <div className="card text-center">
                <div className="card-header">
                    GESTION DE USUARIOS
                </div>
                
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Numero De Cedula</th>
                        <th scope="col">Primer Nombre</th>
                        <th scope="col">Segundo Nombre</th>
                        <th scope="col">Primer Apellido</th>
                        <th scope="col">Segundo Apellido</th>
                        <th scope="col">Email</th>
                        <th scope="col">Fecha De Nacimiento</th>
                        <th scope="col">Direccion</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Numero De Cuenta</th>
                        <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usersList.map((val, key) => (
                            <tr key={key}>
                                <th scope="row">{val.Numero_de_Cedula}</th>
                                <td>{val.Primer_Nombre}</td>
                                <td>{val.Segundo_Nombre}</td>
                                <td>{val.Primer_Apellido}</td>
                                <td>{val.Segundo_Apellido}</td>
                                <td>{val.Email}</td>
                                <td>{val.Fecha_de_Nacimiento}</td>
                                <td>{val.Direccion}</td>
                                <td>{val.Telefono}</td>
                                <td>{val.Numero_de_Cuenta}</td>
                                <td>{val.Estado}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ViewUsers;
