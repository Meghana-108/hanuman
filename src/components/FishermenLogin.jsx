import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';

function FishermenLogin() {
    const navigate=useNavigate()
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    licenseId: '',
    mobile: '',
  });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', formData);
      if (res.data.success) {
        setMessage('OTP sent to your phone');
        setError('');
        setStep(2);
      } else {
        setError(res.data.message);
        setMessage('');
      }
    } catch (err) {
      setError('Server error. Please try again.');
      setMessage('');
    }
  };

  const handleVerify = async () => {
    try {
      const res = await axios.post('http://localhost:5000/verify', {
        phone: formData.mobile,
        otp,
      });
      if (res.data.success) {
        alert('Login Successful');
        localStorage.setItem("isLoggedIn", true);
        navigate('/fisherhome')
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#e0f7fa', // Soft blue background
        backgroundImage: `url('https://i.pinimg.com/736x/8d/ca/8b/8dca8bda81d2e170fb584d465e2b8d45.jpg')`, // optional image
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={5}>
            <Card
              className="rounded-4 shadow"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.97)',
                padding: '30px',
                borderTop: '6px solid #00bcd4', // Sky blue top border
              }}
            >
              <Card.Body>
                <h2 className="text-center fw-bold text-info mb-4">
                  Fishermen Login
                </h2>

                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}

                {step === 1 ? (
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="rounded-3 text-center"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Enter License ID"
                        name="licenseId"
                        value={formData.licenseId}
                        onChange={handleInputChange}
                        className="rounded-3 text-center"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Control
                        type="text"
                        placeholder="Enter Mobile Number"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="rounded-3 text-center"
                      />
                    </Form.Group>

                    <Button
                      style={{
                        backgroundColor: '#00bcd4',
                        borderColor: '#00bcd4',
                        borderRadius: '25px',
                      }}
                      className="w-100"
                      onClick={handleLogin}
                    >
                      Send OTP
                    </Button>
                  </Form>
                ) : (
                  <Form>
                    <Form.Group className="mb-4">
                      <Form.Control
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="rounded-3 text-center"
                      />
                    </Form.Group>
                    <Button
                      style={{
                        backgroundColor: '#00bcd4',
                        borderColor: '#00bcd4',
                        borderRadius: '25px',
                      }}
                      className="w-100"
                      onClick={handleVerify}
                    >
                      Verify OTP
                    </Button>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FishermenLogin;
