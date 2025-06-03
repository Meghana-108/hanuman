// src/pages/OrderPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const OrderPage = () => {
  const { fishId } = useParams();
  const [fish, setFish] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFish = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/fishes/${fishId}`);
        if (!res.ok) throw new Error('Failed to fetch fish');
        const data = await res.json();
        setFish(data);
      } catch (error) {
        console.error(error);
        setFish(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFish();
  }, [fishId]);

  const handlePlaceOrder = () => {
    alert(`Order placed for ${quantity} ${fish.fishName}(s) at $${(fish.price * quantity).toFixed(2)} total.`);
    // You can add actual order submission logic here
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!fish) {
    return (
      <Container className="text-center my-5">
        <h4>Fish not found.</h4>
      </Container>
    );
  }

  const total = (fish.price * quantity).toFixed(2);

  return (
    <Container style={{ maxWidth: 600 }} className="my-5">
      <Card className="shadow-sm p-3">
        <Row>
          <Col md={5} className="d-flex align-items-center">
            <Card.Img
              src={`http://localhost:5000${fish.imageUrl}`}
              alt={fish.fishName}
              style={{ borderRadius: '8px', maxHeight: 180, objectFit: 'cover' }}
            />
          </Col>
          <Col md={7}>
            <Card.Body>
              <Card.Title className="fs-3 fw-bold">{fish.fishName}</Card.Title>
              <Card.Text className="text-muted mb-2">
                Fisherman: <span className="text-dark">{fish.fishermenName || 'Unknown'}</span>
              </Card.Text>
              <Card.Text className="fs-5 fw-semibold mb-4">
                Price: ${fish.price.toFixed(2)} / unit
              </Card.Text>

              <Form.Group controlId="quantity" className="mb-3">
                <Form.Label className="fw-semibold">Quantity</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value < 1 ? 1 : Number(e.target.value))}
                  style={{ maxWidth: 100 }}
                />
              </Form.Group>

              <h5>
                Total: <span className="text-success fw-bold">${total}</span>
              </h5>

              <Button
                variant="success"
                className="mt-3 px-4 fw-semibold"
                style={{ width: '100%' }}
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default OrderPage;
