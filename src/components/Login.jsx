import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const role = decoded.role;
        if (role === "buyer") {
          navigate("/buyerhome");
        } else if (role === "fishermen") {
          navigate("/fisherhome");
        } else {
          navigate("/dashboard");
        }
      } catch (e) {
        console.error("Invalid token:", e);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/buyerlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        try {
          const decoded = jwtDecode(data.token);
          const role = decoded.role;
          if (role === "buyer") {
            navigate("/buyerhome");
          } else if (role === "fishermen") {
            navigate("/fisherhome");
          } else {
            navigate("/dashboard");
          }
        } catch (e) {
          console.error("Failed to decode token:", e);
          navigate("/dashboard");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex flex-column flex-md-row p-0">
      {/* Left image */}
      <Col md={6} className="d-none d-md-flex bg-info justify-content-center align-items-center">
        <img
          src="https://i.pinimg.com/736x/48/17/2d/48172dc2448b4bb1dcce3ef929ab3082.jpg"
          alt="Login Illustration"
          style={{ width: "75%" }}
        />
      </Col>

      {/* Right login form */}
      <Col md={6} className="d-flex align-items-center justify-content-center bg-light">
        <Card className="w-75 shadow p-4 rounded-4">
          <h2 className="text-center text-info mb-2">Welcome Back</h2>
          <p className="text-center text-secondary mb-4">Please login to your account</p>

          {error && <Alert variant="danger" className="text-center">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>

            <Button variant="info" type="submit" className="w-100 text-white fw-semibold">
              Login
            </Button>
          </Form>

          <p className="mt-4 text-center text-secondary">
            Don't have an account?{" "}
            <Link to="/signup" className="text-info fw-semibold text-decoration-none">
              Sign Up
            </Link>
          </p>
        </Card>
      </Col>
    </Container>
  );
};

export default Login;
