import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/cruds.css';
import Header from './header';
import { Navbar, Nav, Table, Spinner, Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editedUser, setEditedUser] = useState({
    Primer_Nombre: '',
    Segundo_Nombre: '',
    Primer_Apellido: '',
    Segundo_Apellido: '',
    Email: '',
    Fecha_de_Nacimiento: '',
    Direccion: '',
    Telefono: '',
    Numero_de_Cuenta_Ahorro: '',
    Estado: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://192.168.101.6:3000/api/usuarios");
        const result = response.data;
        if (result.success) {
          setUsers(result.data);
        } else {
          alert("Error al obtener los usuarios");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al obtener los usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://192.168.101.6:3000/api/usuario/${searchId}`);
      const result = response.data;
      if (result.success) {
        setSearchResults([result.data]);
        setShowModal(true);
      } else {
        alert("Usuario no encontrado");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al buscar el usuario");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSearchResults([]);
    setEditUser(null); // Limpiar el usuario en edición al cerrar el modal
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setEditedUser({ ...user }); // Copiar el usuario para edición
    setEditModalShow(true);
  };

  const handleUpdateUser = async () => {
    try {
// Validar la fecha de nacimiento
const fechaNacimiento = new Date(editedUser.Fecha_de_Nacimiento);
const fechaLimite = new Date();
fechaLimite.setFullYear(fechaLimite.getFullYear() - 55);

// Debugging: Verifica los valores de fechaNacimiento y fechaLimite
console.log("Fecha de Nacimiento:", fechaNacimiento);
console.log("Fecha Límite:", fechaLimite);

// Comprueba si fechaNacimiento es mayor que fechaLimite
if (fechaNacimiento > fechaLimite) {
  alert("La fecha de nacimiento debe ser mayor o igual a 55 años.");
  return;
}
      const response = await axios.put(`http://192.168.101.6:3000/api/usuario/edit/${editedUser.Numero_de_Cedula}`, editedUser);
      const result = response.data;
      if (result.success) {
        // Actualizar la lista de usuarios o cualquier acción adicional
        alert("Usuario actualizado exitosamente");
        setEditModalShow(false);
        // Actualizar la lista de usuarios si es necesario
        const updatedUsers = users.map(u => u.Numero_de_Cedula === editedUser.Numero_de_Cedula ? editedUser : u);
        setUsers(updatedUsers);
      } else {
        alert("Error al actualizar el usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar el usuario");
    }
  };

  const handleDeactivateUser = async (Numero_de_Cedula) => {
    if (window.confirm("¿Estás seguro que deseas desactivar este usuario?")) {
      try {
        const response = await axios.delete(`http://192.168.101.6:3000/api/usuario/delete/${Numero_de_Cedula}`);
        const result = response.data;
        if (result.success) {
          // Actualizar la lista de usuarios o cualquier acción adicional
          alert("Usuario desactivado exitosamente");
          // Actualizar la lista de usuarios si es necesario
          const updatedUsers = users.filter(u => u.Numero_de_Cedula !== Numero_de_Cedula);
          setUsers(updatedUsers);
        } else {
          alert("Error al desactivar el usuario");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al desactivar el usuario");
      }
    }
  };

  const getStatusLabel = (estado) => {
    switch (estado) {
      case 1:
        return 'Activo';
      case 2:
        return 'Inactivo';
      default:
        return estado; // Si el estado no es 1 ni 2, muestra el estado actual
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }
  return (
    <div className='Inicio'>
                <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">AED</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/Crud_user">Usuarios</Nav.Link>
          <Nav.Link href="/Crud_subsidies">Subsidios</Nav.Link>
          <Nav.Link href="/Administrador">Cerrar sesion</Nav.Link>
        </Nav>
      </Navbar>
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="mb-4">Lista de usuarios registrados</h1>
          <Form>
            <Form.Group controlId="formSearchId">
              <Form.Label>Buscar por ID:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese el número de cédula"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </Form.Group>
            <br />
            <Button variant="primary" onClick={handleSearch}>
              Buscar
            </Button>
          </Form>
          <Table striped bordered hover responsive className="mt-4">
  <thead className="thead-dark">
    <tr>
      <th>Número de Cédula</th>
      <th>Primer Nombre</th>
      <th>Segundo Nombre</th>
      <th>Primer Apellido</th>
      <th>Segundo Apellido</th>
      <th>Email</th>
      <th>Fecha de Nacimiento</th>
      <th>Dirección</th>
      <th>Teléfono</th>
      <th>Fecha de Registro</th>
      <th>Número de Cuenta Ahorro</th>
      <th>Estado</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user) => (
      <tr key={user.Numero_de_Cedula}>
        <td>{user.Numero_de_Cedula}</td>
        <td>{user.Primer_Nombre}</td>
        <td>{user.Segundo_Nombre}</td>
        <td>{user.Primer_Apellido}</td>
        <td>{user.Segundo_Apellido}</td>
        <td>{user.Email}</td>
        <td>{new Date(user.Fecha_de_Nacimiento).toLocaleDateString()}</td>
        <td>{user.Direccion}</td>
        <td>{user.Telefono}</td>
        <td>{new Date(user.Fecha_de_Registro).toLocaleDateString()}</td>
        <td>{user.Numero_de_Cuenta_Ahorro}</td>
        <td>{getStatusLabel(user.Estado)}</td>
        <td>
          <Button variant="warning" onClick={() => handleEditUser(user)} className="mb-2">
            Editar
          </Button>{' '}
          <br />
          <Button variant="danger" onClick={() => handleDeactivateUser(user.Numero_de_Cedula)}>
            Eliminar
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
  <tfoot>
    <tr>
      <td colSpan="13" id="tableBottom"></td> {/* Identificador para scroll hacia abajo */}
    </tr>
  </tfoot>
</Table>

        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalle de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover responsive>
            <thead className="thead-dark">
              <tr>
                <th>Número de Cédula</th>
                <th>Primer Nombre</th>
                <th>Segundo Nombre</th>
                <th>Primer Apellido</th>
                <th>Segundo Apellido</th>
                <th>Email</th>
                <th>Fecha de Nacimiento</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Fecha de Registro</th>
                <th>Número de Cuenta Ahorro</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((user) => (
                <tr key={user.Numero_de_Cedula}>
                  <td>{user.Numero_de_Cedula}</td>
                  <td>{user.Primer_Nombre}</td>
                  <td>{user.Segundo_Nombre}</td>
                  <td>{user.Primer_Apellido}</td>
                  <td>{user.Segundo_Apellido}</td>
                  <td>{user.Email}</td>
                  <td>{new Date(user.Fecha_de_Nacimiento).toLocaleDateString()}</td>
                  <td>{user.Direccion}</td>
                  <td>{user.Telefono}</td>
                  <td>{new Date(user.Fecha_de_Registro).toLocaleDateString()}</td>
                  <td>{user.Numero_de_Cuenta_Ahorro}</td>
                  <td>{getStatusLabel(user.Estado)}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEditUser(user)}>
                      Editar
                    </Button>{' '}
                    <Button variant="danger" onClick={() => handleDeactivateUser(user.Numero_de_Cedula)}>
                    Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para editar usuario */}
      <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editFormNumeroCedula">
              <Form.Label>Número de Cédula</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el número de cédula"
                value={editedUser.Numero_de_Cedula}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="editFormPrimerNombre">
              <Form.Label>Primer Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el primer nombre"
                value={editedUser.Primer_Nombre}
                onChange={(e) => setEditedUser({ ...editedUser, Primer_Nombre: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editFormSegundoNombre">
              <Form.Label>Segundo Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el segundo nombre"
                value={editedUser.Segundo_Nombre}
                onChange={(e) => setEditedUser({ ...editedUser, Segundo_Nombre: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editFormPrimerApellido">
              <Form.Label>Primer Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el primer apellido"
                value={editedUser.Primer_Apellido}
                onChange={(e) => setEditedUser({ ...editedUser, Primer_Apellido: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editFormSegundoApellido">
              <Form.Label>Segundo Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el segundo apellido"
                value={editedUser.Segundo_Apellido}
                onChange={(e) => setEditedUser({ ...editedUser, Segundo_Apellido: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editFormEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese el correo electrónico"
                value={editedUser.Email}
                onChange={(e) => setEditedUser({ ...editedUser, Email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editFormFechaNacimiento">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                placeholder="Ingrese la fecha de nacimiento"
                value={editedUser.Fecha_de_Nacimiento}
                onChange={(e) => setEditedUser({ ...editedUser, Fecha_de_Nacimiento: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editFormDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese la dirección"
                value={editedUser.Direccion}
                onChange={(e) => setEditedUser({ ...editedUser, Direccion: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editFormTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Ingrese el número de teléfono"
                value={editedUser.Telefono}
                onChange={(e) => setEditedUser({ ...editedUser, Telefono: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editFormNumeroCuentaAhorro">
              <Form.Label>Número de Cuenta Ahorro</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el número de cuenta de ahorro"
                value={editedUser.Numero_de_Cuenta_Ahorro}
                onChange={(e) => setEditedUser({ ...editedUser, Numero_de_Cuenta_Ahorro: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editFormEstado">
            <Form.Label>Estado</Form.Label>
            <Form.Control
            as="select"
            value={editedUser.Estado}
           onChange={(e) => setEditedUser({ ...editedUser, Estado: parseInt(e.target.value) })}
           >
           <option value={1}>Activo</option>
           <option value={2}>Inactivo</option>
           </Form.Control>
          </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModalShow(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdateUser}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  </div>
  );
};

export default ViewUsers;
