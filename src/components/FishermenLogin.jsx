import React, { useState } from 'react';
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
        window.location.href = '/home';
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
    background: 'linear-gradient(135deg, #ccefff, #e0f7fa)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  }}
>

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Card
              className="shadow-lg border-0 rounded-4"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '25px' }}
            >
              <Card.Body>
                <h3 className="text-center mb-4 text-primary fw-bold">
                  {step === 1 ? 'Fishermen Login' : 'Verify OTP'}
                </h3>

                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}

                {step === 1 ? (
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>License ID</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter license ID"
                        name="licenseId"
                        value={formData.licenseId}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter mobile number"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Button variant="primary" className="w-100" onClick={handleLogin}>
                      Send OTP
                    </Button>
                  </Form>
                ) : (
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter OTP</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="success" className="w-100" onClick={handleVerify}>
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
