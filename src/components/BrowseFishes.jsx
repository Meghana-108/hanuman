// src/components/BrowseFishes.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BrowseFishes = () => {
  const [fishes, setFishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/fishes')
      .then((res) => res.json())
      .then((data) => {
        setFishes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching fishes:', err);
        setLoading(false);
      });
  }, []);

const goToOrderPage = (fishId) => {
  navigate(`/order/${fishId}`);
};

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary mb-4">🐟 Browse Fishes</h2>
      <Row className="g-4">
        {fishes.map((fish) => (
          <Col md={4} key={fish._id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={`http://localhost:5000${fish.imageUrl}`}
                alt={fish.fishName}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{fish.fishName}</Card.Title>
                <Card.Text>
                  <strong>Price:</strong> ${fish.price}<br />
                  <strong>Fisherman:</strong> {fish.fishermenName || 'Unknown'}
                </Card.Text>
                <div className="mt-auto d-flex justify-content-between">
                <Button variant="success" onClick={() => goToOrderPage(fish._id)}>
  Order
</Button>
<Button variant="warning" onClick={() => navigate("/chat/buyer")}>Negotiate</Button>

                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BrowseFishes;
