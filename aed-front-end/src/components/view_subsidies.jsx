import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './header';
import '../styles/cruds.css';
import { Navbar, Nav, Table, Spinner, Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const ViewSubsidies = () => {
  const [subsidies, setSubsidies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editSubsidy, setEditSubsidy] = useState(null);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editedSubsidy, setEditedSubsidy] = useState({
    Monto: 0,
    Estado: 1,
    ID_Usuario: '',
  });
  const [createModalShow, setCreateModalShow] = useState(false); // Estado para el modal de creación

  useEffect(() => {
    const fetchSubsidies = async () => {
      try {
        const response = await axios.get("http://192.168.101.6:3000/api/subsidios");
        const result = response.data;
        if (result.success) {
          setSubsidies(result.data);
        } else {
          alert("Error al obtener los subsidios");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al obtener los subsidios");
      } finally {
        setLoading(false);
      }
    };

    fetchSubsidies();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://192.168.101.6:3000/api/subsidio/${searchId}`);
      const result = response.data;
      if (result.success) {
        setSearchResults([result.data]);
        setShowModal(true);
      } else {
        alert("Subsidio no encontrado");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al buscar el subsidio");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSearchResults([]);
    setEditSubsidy(null);
  };

  const handleEditSubsidy = (subsidy) => {
    setEditSubsidy(subsidy);
    setEditedSubsidy({ ...subsidy });
    setEditModalShow(true);
  };

  const handleUpdateSubsidy = async () => {
    try {
      const response = await axios.put(`http://192.168.101.6:3000/api/subsidio/edit/${editedSubsidy.ID}`, editedSubsidy);
      const result = response.data;
      if (result.success) {
        alert("Subsidio actualizado exitosamente");
        setEditModalShow(false);
        const updatedSubsidies = subsidies.map(s => s.ID === editedSubsidy.ID ? editedSubsidy : s);
        setSubsidies(updatedSubsidies);
      } else {
        alert("Error al actualizar el subsidio");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar el subsidio");
    }
  };

  const handleDeactivateSubsidy = async (ID) => {
    if (window.confirm("¿Estás seguro que deseas desactivar este subsidio?")) {
      try {
        const response = await axios.delete(`http://192.168.101.6:3000/api/subsidio/delete/${ID}`);
        const result = response.data;
        if (result.success) {
          alert("Subsidio desactivado exitosamente");
          const updatedSubsidies = subsidies.filter(s => s.ID !== ID);
          setSubsidies(updatedSubsidies);
        } else {
          alert("Error al desactivar el subsidio");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al desactivar el subsidio");
      }
    }
  };

  const handleCreateSubsidy = async () => {
    try {
      const response = await axios.post(`http://192.168.101.6:3000/api/subsidio/create`, editedSubsidy);
      const result = response.data;
      if (result.success) {
        alert("Subsidio creado exitosamente");
        // Actualizar el estado local con el nuevo subsidio creado
        setSubsidies([...subsidies, result.data]);
        // Cerrar el modal de creación
        setCreateModalShow(false);
      } else {
        alert("Error al crear el subsidio");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear el subsidio");
    }
  };
  

  const getStatusLabel = (estado) => {
    switch (estado) {
      case 1:
        return 'Reclamado';
      case 2:
        return 'No reclamado';
      default:
        return estado;
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
          <h1 className="mb-4">Lista de subsidios registrados</h1>
          <Form>
            <Form.Group controlId="formSearchId">
              <Form.Label>Buscar por ID:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese el ID del subsidio"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </Form.Group>
            <br />
            <Button variant="primary" onClick={handleSearch}>
              Buscar
            </Button>
            {' '}
            <Button variant="success" onClick={() => setCreateModalShow(true)}>
              Crear Subsidio
            </Button>
          </Form>
          <Table striped bordered hover responsive className="mt-4">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Monto</th>
                <th>Estado</th>
                <th>ID de Usuario</th>
                <th>Fecha de Otorgamiento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {subsidies.map((subsidy) => (
                <tr key={subsidy.ID}>
                  <td>{subsidy.ID}</td>
                  <td>{subsidy.Monto}</td>
                  <td>{getStatusLabel(subsidy.Estado)}</td>
                  <td>{subsidy.ID_Usuario}</td>
                  <td>{new Date(subsidy.Fecha_de_Otorgamiento).toLocaleDateString()}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEditSubsidy(subsidy)} className="mb-2">
                      Editar
                    </Button>{' '}
                    <Button variant="danger" onClick={() => handleDeactivateSubsidy(subsidy.ID)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal para visualizar detalles de subsidio */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalle de Subsidio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover responsive>
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Monto</th>
                <th>Estado</th>
                <th>ID de Usuario</th>
                <th>Fecha de Otorgamiento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((subsidy) => (
                <tr key={subsidy.ID}>
                  <td>{subsidy.ID}</td>
                  <td>{subsidy.Monto}</td>
                  <td>{getStatusLabel(subsidy.Estado)}</td>
                  <td>{subsidy.ID_Usuario}</td>
                  <td>{new Date(subsidy.Fecha_de_Otorgamiento).toLocaleDateString()}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEditSubsidy(subsidy)}>
                      Editar
                    </Button>{' '}
                    <Button variant="danger" onClick={() => handleDeactivateSubsidy(subsidy.ID)}>
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

      {/* Modal para editar subsidio */}
      <Modal show={editModalShow} onHide={() => setEditModalShow(false)} centered>
        <Modal.Header closeButton>
        <Modal.Title>Editar Subsidio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditMonto">
              <Form.Label>Monto</Form.Label>
              <Form.Control
                type="number"
                value={editedSubsidy.Monto}
                onChange={(e) => setEditedSubsidy({ ...editedSubsidy, Monto: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEditEstado">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                as="select"
                value={editedSubsidy.Estado}
                onChange={(e) => setEditedSubsidy({ ...editedSubsidy, Estado: parseInt(e.target.value) })}
              >
                <option value={1}>Reclamado</option>
                <option value={2}>No reclamado</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formEditUsuario">
              <Form.Label>ID de Usuario</Form.Label>
              <Form.Control
                type="text"
                value={editedSubsidy.ID_Usuario}
                onChange={(e) => setEditedSubsidy({ ...editedSubsidy, ID_Usuario: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModalShow(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdateSubsidy}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para crear subsidio */}
      <Modal show={createModalShow} onHide={() => setCreateModalShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Subsidio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCreateMonto">
              <Form.Label>Monto</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese el monto del subsidio"
                value={editedSubsidy.Monto}
                onChange={(e) => setEditedSubsidy({ ...editedSubsidy, Monto: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formCreateEstado">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                as="select"
                value={editedSubsidy.Estado}
                onChange={(e) => setEditedSubsidy({ ...editedSubsidy, Estado: parseInt(e.target.value) })}
              >
                <option value={1}>Reclamado</option>
                <option value={2}>No reclamado</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formCreateUsuario">
              <Form.Label>ID de Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el ID de usuario"
                value={editedSubsidy.ID_Usuario}
                onChange={(e) => setEditedSubsidy({ ...editedSubsidy, ID_Usuario: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setCreateModalShow(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreateSubsidy}>
            Crear Subsidio
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
    </div>
  );
};

export default ViewSubsidies;

