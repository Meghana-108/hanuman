import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form, Modal } from "react-bootstrap";

const FisherDashboard = () => {
  const [fishList, setFishList] = useState([]);
  const [editingFishId, setEditingFishId] = useState(null);
  const [formData, setFormData] = useState({
    fishName: "",
    location: "",
    price: "",
    status: "",
  });
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("No auth token found. Please login.");
      return;
    }
    fetchFish();
  }, [token]);

  const fetchFish = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/fish", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFishList(res.data);
    } catch (err) {
      console.error("Error fetching fish:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (editingFishId) return;

    try {
      await axios.delete(`http://localhost:5000/api/fish/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFishList((prev) => prev.filter((fish) => fish._id !== id));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  };

  const handleEditClick = (fish) => {
    setEditingFishId(fish._id);
    setFormData({
      fishName: fish.fishName,
      location: fish.location,
      price: fish.price,
      status: fish.status,
    });
    setShowModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/fish/${editingFishId}`,
        { ...formData, price: Number(formData.price) },
        { headers: { Authorization:` Bearer ${token} `} }
      );
      setEditingFishId(null);
      setFormData({ fishName: "", location: "", price: "", status: "" });
      setShowModal(false);
      fetchFish();
    } catch (err) {
      console.error("Edit error:", err.response?.data || err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingFishId(null);
    setFormData({ fishName: "", location: "", price: "", status: "" });
    setShowModal(false);
  };

  return (
    <div className="fisher-dashboard-bg py-5">
      <Container>
        <Row xs={1} md={2} lg={3} className="g-4">
          {fishList.map((fish) => (
            <Col key={fish._id}>
              <Card className="glass-card border-light shadow-lg">
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000${fish.imageUrl}`}
                  style={{ width: "100%", height: "250px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder-image.png";
                  }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold fs-4 text-dark">{fish.fishName}</Card.Title>
                  <Card.Text className="text-dark">📍 {fish.location}</Card.Text>
                  <Card.Text className="text-dark">💰 ₹{fish.price} per 1K</Card.Text>
                  <Card.Text className="text-dark">
                    Status: <span className="text-info">{fish.status}</span>
                  </Card.Text>
                  <div className="d-flex justify-content-between mt-3">
                    <Button variant="warning" onClick={() => handleEditClick(fish)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(fish._id)}>Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={handleCancelEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Fish Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Fish Name"
                value={formData.fishName}
                onChange={(e) => setFormData({ ...formData, fishName: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                min="0"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">Save</Button>
              <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FisherDashboard;