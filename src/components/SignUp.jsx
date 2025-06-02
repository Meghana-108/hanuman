import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "fishermen",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/buyerhome");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/buyersignup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        const decoded = jwtDecode(data.token);
        const role = decoded.role;

        if (role === "buyer") {
          navigate("/buyerhome");
        } else if (role === "fishermen") {
          navigate("/fishermenlogin");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Something went wrong.");
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex flex-column flex-md-row p-0">
      {/* Left image section */}
      <Col
        md={6}
        className="d-none d-md-flex align-items-center justify-content-center bg-info"
      >
        <img
          src="https://i.pinimg.com/736x/48/17/2d/48172dc2448b4bb1dcce3ef929ab3082.jpg"
          alt="Signup Illustration"
          className="img-fluid w-75"
        />
      </Col>

      {/* Signup form section */}
      <Col
        md={6}
        className="d-flex align-items-center justify-content-center bg-light px-4 py-5"
      >
        <Card className="w-100 shadow rounded-4" style={{ maxWidth: "400px" }}>
          <Card.Body>
            <h2 className="text-center text-info mb-2">Create Account</h2>
            <p className="text-center text-muted mb-4">Sign up to get started</p>

            {error && <Alert variant="danger" className="text-center">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </Form.Group>

              <Form.Group controlId="role" className="mb-4">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="fishermen">Fishermen</option>
                  <option value="buyer">Buyer</option>
                </Form.Select>
              </Form.Group>

              <Button
                variant="info"
                type="submit"
                className="w-100 text-white fw-semibold"
              >
                Sign Up
              </Button>
            </Form>

            <p className="mt-4 text-center text-muted">
              Already have an account?{" "}
              <Link to="/" className="text-info fw-medium">
                Login
              </Link>
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default Signup;
