import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BuyerDashboard = () => {
  return (
    <div className="bg-light" style={{ minHeight: '100vh', paddingTop: '60px' }}>
      <Container>
        <h2 className="text-center text-primary fw-bold mb-4">Buyer Dashboard</h2>
        <Row className="g-4 justify-content-center">
          {/* Card 1: Browse Fishes */}
          <Col md={4}>
            <Card className="shadow h-100">
              <Card.Body className="text-center">
                <Card.Title className="text-primary">Browse Fishes</Card.Title>
                <Card.Text>
                  Explore our wide variety of fresh fishes curated specially for you.
                </Card.Text>
                <Button as={Link} to="/browse" variant="primary">
                  Browse Now
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 2: View Available Fishes */}
          <Col md={4}>
            <Card className="shadow h-100">
              <Card.Body className="text-center">
                <Card.Title className="text-primary">Available Fishes</Card.Title>
                <Card.Text>
                  See the list of currently available fresh fishes ready to be delivered.
                </Card.Text>
                <Button as={Link} to="/available-fishes" variant="primary">
                  View Fishes
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 3: View Price Analytics */}
          <Col md={4}>
            <Card className="shadow h-100">
              <Card.Body className="text-center">
                <Card.Title className="text-primary">Price Analytics</Card.Title>
                <Card.Text>
                  Analyze price trends and make informed buying decisions.
                </Card.Text>
                <Button as={Link} to="/price-analytics" variant="primary">
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
