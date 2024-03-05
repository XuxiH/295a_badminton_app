import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Row, Col, Button, Image, Modal, Form } from "react-bootstrap";

const Matches = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    playformat: "single",
    opponentemail: undefined,
    yourscores: undefined,
    opponentscores: undefined,
    teammateemail: undefined,
  });
  const handleChange = (type, data) => {
    setFormData({ ...formData, [type]: data });
  };
  return (
    <Container>
      <div className="d-flex align-items-center">
        <h3 className="my-4" style={{ marginRight: 100 }}>
          Your Match History
        </h3>
        <Button onClick={handleShow}>Add Match</Button>
      </div>
      <div>
        <Row>
          <Col className="my-3" sm xs={2} md={2}>
            <span style={{ color: "rgba(180, 180, 180, 1)", fontSize: 20 }}>
              Date
            </span>
          </Col>
          <Col className="my-3" sm xs={3} md={2}>
            <span style={{ color: "rgba(180, 180, 180, 1)", fontSize: 20 }}>
              Author
            </span>
          </Col>
          <Col className="my-3" sm xs={6} md={2}>
            <span style={{ color: "rgba(180, 180, 180, 1)", fontSize: 20 }}>
              Play Format
            </span>
          </Col>
          <Col className="my-3" sm xs={1} md={6}>
            <span></span>
          </Col>
        </Row>
        <Row style={{ borderBottom: "1px solid rgba(180, 180, 180, 1)" }}>
          <Col className="my-3 d-flex align-items-center" sm md={2}>
            <span>Nov 23,2023</span>
          </Col>
          <Col className="my-3 d-flex align-items-center" sm md={2}>
            <span>Jennifer Lee</span>
          </Col>
          <Col className="my-3 d-flex align-items-center" sm md={2}>
            <span>Single</span>
          </Col>
          <Col
            className="d-flex justify-content-around align-items-center  my-3"
            sm
            md={6}
          >
            <div>
              <span>
                <Image
                  style={{ height: "2em", marginRight: "20px" }}
                  src="https://github.com/mdo.png"
                  roundedCircle
                />
                <span>Jennifer Lee</span>
              </span>
            </div>
            <div>
              <span>34 vs 28</span>
            </div>
            <div>
              <span>
                <Image
                  style={{ height: "2em", marginRight: "20px" }}
                  src="https://github.com/mdo.png"
                  roundedCircle
                />
                <span>Jessica Young</span>
              </span>
            </div>
          </Col>
        </Row>
        <Row style={{ borderBottom: "1px solid rgba(180, 180, 180, 1)" }}>
          <Col className="my-3 d-flex align-items-center" sm md={2}>
            <span>Nov 23,2023</span>
          </Col>
          <Col className="my-3 d-flex align-items-center" sm md={2}>
            <span>Jennifer Lee</span>
          </Col>
          <Col className="my-3 d-flex align-items-center" sm md={2}>
            <span>Single</span>
          </Col>
          <Col
            className="d-flex justify-content-around align-items-center my-3"
            sm
            md={6}
          >
            <div className="d-flex flex-column">
              <span>
                <Image
                  style={{ height: "2em", marginRight: "20px" }}
                  src="https://github.com/mdo.png"
                  roundedCircle
                />
                <span>Jennifer Lee</span>
              </span>
              <span>
                <Image
                  style={{ height: "2em", marginRight: "20px" }}
                  src="https://github.com/mdo.png"
                  roundedCircle
                />
                <span>Jennifer Lee</span>
              </span>
            </div>
            <div>
              <span>34 vs 28</span>
            </div>
            <div className="d-flex flex-column">
              <span>
                <Image
                  style={{ height: "2em", marginRight: "20px" }}
                  src="https://github.com/mdo.png"
                  roundedCircle
                />
                <span>Jessica Young</span>
              </span>
              <span>
                <Image
                  style={{ height: "2em", marginRight: "20px" }}
                  src="https://github.com/mdo.png"
                  roundedCircle
                />
                <span>Jessica Young</span>
              </span>
            </div>
          </Col>
        </Row>
        <Row style={{ borderBottom: "1px solid rgba(180, 180, 180, 1)" }}>
          <Col className="my-3 d-flex align-items-center" sm md={2}>
            <span>Nov 23,2023</span>
          </Col>
          <Col className="my-3 d-flex align-items-center" sm md={2}>
            <span>Jennifer Lee</span>
          </Col>
          <Col className="my-3 d-flex align-items-center" sm md={2}>
            <span>Single</span>
          </Col>
          <Col
            className="d-flex justify-content-around align-items-center  my-3"
            sm
            md={6}
          >
            <div>
              <span>Jennifer Lee</span>
            </div>
            <div>
              <span>34 vs 28</span>
            </div>
            <div>
              <span>Jessica Young</span>
            </div>
          </Col>
        </Row>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Match</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Hi Daniel, how is your game?</h4>
          <Form>
            <Form.Group className="mb-3" controlId="playformat">
              <Form.Label>Play Format</Form.Label>
              <Form.Select
                value={formData.playformat}
                onChange={(e) => {
                  handleChange("playformat", e.target.value);
                }}
              >
                <option value="single">Single</option>
                <option value="double">Double</option>
              </Form.Select>
            </Form.Group>
            {formData.playformat === "double" && (
              <Form.Group className="mb-3" controlId="teammateemail">
                <Form.Label>Teammate Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="email"
                  value={formData.teammateemail}
                  onChange={(e) => {
                    handleChange("teammateemail", e.target.value);
                  }}
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="opponentemail">
              <Form.Label>Opponent Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                value={formData.opponentemail}
                onChange={(e) => {
                  handleChange("opponentemail", e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group controlId="yourscores">
              <Form.Label>Your Scores</Form.Label>
              <Form.Control
                type="number"
                value={formData.yourscores}
                onChange={(e) => {
                  handleChange("yourscores", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="opponentscores">
              <Form.Label>Opponent Scores</Form.Label>
              <Form.Control
                type="number"
                value={formData.opponentscores}
                onChange={(e) => {
                  handleChange("opponentscores", e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default Matches;
