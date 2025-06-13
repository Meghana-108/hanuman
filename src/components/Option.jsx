import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Option = () => {
  return (
    <div className="option-wrapper d-flex align-items-center justify-content-center px-3 py-5">
      {/* Side Border */}
      <div className="side-border"></div>

      {/* Main Content */}
      <Container className="position-relative text-center">
        <h2 className="display-4 fw-bold text-gradient mb-5 drop-shadow animate__animated animate__fadeIn">
          Choose Your Action
        </h2>

        <Row className="g-4 justify-content-center">
          {/* Add Fish Details Card */}
          <Col md={6} lg={4}>
            <Card className="option-card h-100 text-center shadow-lg">
              <Card.Img
                variant="top"
                src="https://i.pinimg.com/736x/2c/7e/66/2c7e6661e03e1f5bb55950b4d70febdc.jpg"
                className="img-fluid p-3"
              />
              <Card.Body>
                <Card.Title className="text-primary fw-bold">Add Fish Details</Card.Title>
                <Card.Text className="text-muted">
                  Log the fish you've caught — species, weight, location, and more.
                </Card.Text>
                <Link to="/FishDetails">
                  <Button variant="primary" className="rounded-pill px-4">
                    Add Details
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Price Analytics Card */}
          <Col md={6} lg={4}>
            <Card className="option-card h-100 text-center shadow-lg">
              <Card.Img
                variant="top"
                src="https://i.pinimg.com/736x/14/b1/dd/14b1ddc2e255ff9af2cbbdbd5e861379.jpg"
                className="img-fluid p-3"
              />
              <Card.Body>
                <Card.Title className="text-success fw-bold">Price Analytics</Card.Title>
                <Card.Text className="text-muted">
                  Analyze market trends to optimize your fish pricing strategy.
                </Card.Text>
                <Link to="/price-analytics">
                  <Button variant="success" className="rounded-pill px-4">
                    View Analytics
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Dashboard Card */}
          <Col md={6} lg={4}>
            <Card className="option-card h-100 text-center shadow-lg">
              <Card.Img
                variant="top"
                src="https://i.pinimg.com/736x/68/dd/d5/68ddd52c160db8c0ff3a970c33566809.jpg"
                className="img-fluid p-3"
              />
              <Card.Body>
                <Card.Title className="text-purple fw-bold">Dashboard</Card.Title>
                <Card.Text className="text-muted">
                  View an overview of your fishing activities and insights.
                </Card.Text>
                <Link to="/fisherdashboard">
                  <Button variant="secondary" className="rounded-pill px-4 bg-purple border-0">
                    Go to Dashboard
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Option;
