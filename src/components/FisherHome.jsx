import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

const FisherHome = () => {
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

 return (
  <div
    className="min-vh-100 d-flex align-items-center justify-content-center bg-cover bg-center position-relative"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Overlay */}
    <div
      className="position-absolute top-0 start-0 w-100 h-100"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1 }}
    ></div>

    {/* Content Box */}
    <Container className="position-relative" style={{ zIndex: 2 }}>
      <Row className="justify-content-center">
        <Col md={8} lg={8}>


          <Card
            className="text-white shadow-lg border-0"
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(10px)",
              borderRadius: "1.5rem",
            }}
          >
            <Card.Body className="text-center p-5">
              <Card.Title as="h1" className="display-4 fw-bold mb-4 text-shadow">
                Welcome, Fishermen!
              </Card.Title>
              <Card.Text className="lead mb-4 text-light">
                Join our community of passionate fishermen. Share your catches,
                explore top fishing spots, and connect with fellow enthusiasts.
              </Card.Text>

              <Link
                to="/option"
                className="btn btn-warning text-dark fw-semibold py-2 px-4 rounded-pill mb-3 shadow"
              >
                Get Started
              </Link>
              <br />
              <Button
                onClick={handleLogout}
                variant="danger"
                className="fw-semibold py-2 px-4 rounded-pill"
              >
                Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);
};

export default FisherHome;
