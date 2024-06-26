import React, { useEffect, useState } from 'react';
import Footer from './footer'; 
import Header from './header';
import { useParams } from 'react-router-dom'; 
import {  Navbar, Nav, Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import '../styles/sub.css'; 

const Subsidies = () => {
  const { email } = useParams(); // Captura el parámetro de ruta email
  const [subsidios, setSubsidios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [subsidioToDelete, setSubsidioToDelete] = useState(null);

  useEffect(() => {
    const fetchSubsidios = async () => {
      try {
        const response = await fetch(`http://192.168.101.6:3000/api/subsidios/email/${encodeURIComponent(email)}`);
        if (response.ok) {
          const data = await response.json();
          setSubsidios(data.data); // Actualiza el estado de subsidios con los datos obtenidos
        } else {
          console.error('Error al obtener subsidios:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener subsidios:', error);
      }
    };

    if (email) {
      fetchSubsidios(); // Llama a la función para obtener subsidios cuando cambie el email
    }
  }, [email]); // Ejecuta el efecto cuando cambie el email

  const handleRetiradoClick = (id) => {
    setSubsidioToDelete(id);
    setShowModal(true);
  };

  const handleConfirmRetirado = async () => {
    try {
      const response = await fetch(`http://192.168.101.6:3000/api/subsidio/delete/${subsidioToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Actualizar la lista de subsidios después de retirar el subsidio
        const updatedSubsidios = subsidios.filter(subsidio => subsidio.ID !== subsidioToDelete);
        setSubsidios(updatedSubsidios);
        setShowModal(false);
      } else {
        console.error('Error al retirar el subsidio:', response.statusText);
      }
    } catch (error) {
      console.error('Error al retirar el subsidio:', error);
    }
  };

  return (
    <div className='Inicio'>
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">AED</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/Subsidies/:email">Subsidios</Nav.Link>
          <Nav.Link href="/">Cerrar sesion</Nav.Link>
        </Nav>
      </Navbar>      <Container className="mt-5">
        <h1 style={{ color: '#EDE3B0', fontFamily: 'Arial, sans-serif' }}>
          Estimad@ señor@, estos son los subsidios que ha recibido:
        </h1>
        <br />
        <Row className="mt-4">
          {subsidios.map(subsidio => (
            <Col key={subsidio.ID} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card style={{ borderColor: '#67BB7E' }}>
                <Card.Body style={{ backgroundColor: '#F0F0F0', color: '#333', fontFamily: 'Arial, sans-serif' }}>
                  <Card.Title style={{ color: '#67BB7E', fontSize: '1.2rem', marginBottom: '1rem' }}>Subsidio ID: {subsidio.ID}</Card.Title>
                  <Card.Text>
                    <strong style={{ color: '#555' }}>Monto:</strong> {subsidio.Monto}<br />
                    <strong style={{ color: '#555' }}>Estado:</strong> {subsidio.Estado === 2 ? 'No retirado' : 'Retirado'}<br />
                    <strong style={{ color: '#555' }}>Fecha de Otorgamiento:</strong> {new Date(subsidio.Fecha_de_Otorgamiento).toLocaleDateString()}<br />
                    <strong style={{ color: '#555' }}>ID Usuario:</strong> {subsidio.ID_Usuario}
                  </Card.Text>
                  <Button variant="danger" onClick={() => handleRetiradoClick(subsidio.ID)}>Retirado</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal de Confirmación */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar de que ya retiraste</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que ya retiraste este subsidio?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleConfirmRetirado}>Confirmar que si se retiro</Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

export default Subsidies;
