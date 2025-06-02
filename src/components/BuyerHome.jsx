import React from 'react';
import { Container, Row, Col, Button, Card, Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const BuyerHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <div className="bg-info text-white text-center py-1">
        Fresh Catch, Delivered Right to You!
      </div>

      {/* Navigation Bar */}
      <Navbar bg="white" expand="lg" className="shadow-sm px-4">
        <Navbar.Brand className="text-info fw-bold">⚓ FishTank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
         
        </Navbar.Collapse>
      </Navbar>

      {/* Hero Section */}
      <div
        style={{
          flex: 1,
          backgroundImage: 'url(https://i.pinimg.com/736x/ad/8e/97/ad8e974a82efd6e89c01ec32004c0075.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        {/* Dim background overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
        />

        {/* Hero Content */}
        <Container className="h-100 d-flex justify-content-center align-items-center">
          <Row className="text-center text-white position-relative">
            <Col md={12}>
              <h2 className="display-5 fw-semibold fst-italic">Welcome to FishTank!</h2>
              <h1 className="display-6 fw-bold text-uppercase mb-4">Your Fish, Your Data, Your Way!</h1>
             <Button
  as={Link}
  to="/buyer-dashboard"
  variant="info"
  className="px-4 py-2 fw-bold text-white mb-5"
>
  More Info
</Button>

              {/* Offer Section */}
              <Card
                className="mx-auto p-4 shadow-lg"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  maxWidth: '500px',
                }}
              >
                <Card.Body>
                  <Card.Title className="text-info fst-italic">What We Offer</Card.Title>
                  <Card.Subtitle className="mb-2 fw-bold">To Our Buyers!</Card.Subtitle>
                  <Card.Text className="text-muted">
                    Experience top-quality, fresh fish with every purchase. We ensure our buyers get the best catch, sourced and delivered with care.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <button
          onClick={handleLogout}
          className="bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
    </div>
  );
};

export default BuyerHome;
