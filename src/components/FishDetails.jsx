import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import axios from "axios";

const FishDetails = () => {
  const [fishImage, setFishImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fishName, setFishName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFishImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    if (!fishImage || !fishName || !location || !price || !status) {
      setError("Please fill in all fields before submitting.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fishImage", fishImage);
      formData.append("fishName", fishName);
      formData.append("location", location);
      formData.append("price", price);
      formData.append("status", status);

      const token = localStorage.getItem("token");

      const response = await axios.post("http://localhost:5000/api/fish", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setSuccess(true);
        setFishImage(null);
        setPreviewImage(null);
        setFishName("");
        setLocation("");
        setPrice("");
        setStatus("");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError("Unauthorized. Please log in again.");
      } else {
        setError("Failed to upload. Please check your connection or server.");
      }
    }
  };

  return (
    <div
      className="position-relative d-flex align-items-center justify-content-center min-vh-100 p-4"
      style={{
        background: "linear-gradient(to bottom right, #bfdbfe, #ffffff, #cbd5e1)",
        overflow: "hidden",
      }}
    >
      {/* Decorative Bubbles */}
      <div
        className="position-absolute rounded-circle"
        style={{
          width: "300px",
          height: "300px",
          backgroundColor: "#93c5fd",
          top: "-100px",
          left: "-100px",
          opacity: 0.3,
          filter: "blur(100px)",
          zIndex: 0,
        }}
      />
      <div
        className="position-absolute rounded-circle"
        style={{
          width: "400px",
          height: "400px",
          backgroundColor: "#60a5fa",
          bottom: "-150px",
          right: "-150px",
          opacity: 0.2,
          filter: "blur(100px)",
          zIndex: 0,
        }}
      />

      <Container style={{ zIndex: 1 }}>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card
              className="border-0 shadow-lg p-4"
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(12px)",
                borderRadius: "2rem",
              }}
            >
              <Card.Body>
                <h2 className="text-center text-primary fw-bold mb-4">
                  🐟 Add Fish Details
                </h2>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">🎉 Fish details submitted successfully!</Alert>}

                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label className="fw-semibold text-primary">Fish Image</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="mt-3 rounded shadow"
                        style={{ height: "160px", width: "100%", objectFit: "cover" }}
                      />
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-primary">Fish Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter fish name"
                      value={fishName}
                      onChange={(e) => setFishName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-primary">Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-primary">Price (per 1K)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold text-primary">Status</Form.Label>
                    <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Select status</option>
                      <option value="Fresh">Fresh</option>
                      <option value="Frozen">Frozen</option>
                      <option value="Salted">Salted</option>
                      <option value="Dried">Dried</option>
                    </Form.Select>
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 fw-bold py-2"
                    style={{
                      background: "linear-gradient(to right, #2563eb, #3b82f6)",
                      border: "none",
                      fontSize: "1.1rem",
                    }}
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FishDetails;
