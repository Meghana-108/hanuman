import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BuyerDashboard = () => {
  return (
    <div className="bg-white" style={{ minHeight: '100vh', paddingTop: '60px' }}>
      <Container>
        <h2 className="text-center text-info fw-bold mb-5">Welcome to Your Dashboard</h2>
        <Row className="g-4 justify-content-center">
          {/* Card 1: Browse Fishes */}
          <Col md={4}>
            <Card className="shadow-lg border-0 h-100">
              <Card.Body className="text-center">
                <Card.Title className="text-info fw-semibold">🐟 Browse Fishes</Card.Title>
                <Card.Text className="text-muted">
                  Explore our wide variety of fresh fishes curated specially for you.
                </Card.Text>
                <Button as={Link} to="/browse" variant="info" className="text-white fw-bold">
                  Browse Now
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 2: View Available Fishes */}
          <Col md={4}>
            <Card className="shadow-lg border-0 h-100">
              <Card.Body className="text-center">
                <Card.Title className="text-info fw-semibold">📦 Available Fishes</Card.Title>
                <Card.Text className="text-muted">
                  See what's in stock and ready to be delivered fresh to your doorstep.
                </Card.Text>
                <Button as={Link} to="/available-fishes" variant="info" className="text-white fw-bold">
                  View Fishes
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 3: View Price Analytics */}
          <Col md={4}>
            <Card className="shadow-lg border-0 h-100">
              <Card.Body className="text-center">
                <Card.Title className="text-info fw-semibold">📊 Price Analytics</Card.Title>
                <Card.Text className="text-muted">
                  Make informed decisions with our real-time fish price tracking.
                </Card.Text>
                <Button as={Link} to="/price-analytics" variant="info" className="text-white fw-bold">
                  View Analytics
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BuyerDashboard;
