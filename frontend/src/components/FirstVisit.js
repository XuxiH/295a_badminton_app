import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import logo from "../assets/images/logo.svg";
import avatar from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../api";
import "./FirstVisit.css";

const Firstvisit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gender: "male",
    age: undefined,
    location: undefined,
    experience: undefined,
    playstyle: {
      single: false,
      double: false,
      mix: false,
    },
    matchdistance: undefined,
    story: "",
  });
  const [warning, setWarning] = useState({ visible: false, message: "" });
  const [user, setUser] = useState({});

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = async () => {
    const email = sessionStorage.getItem("email");
    // console.log("email is : ", email);
    if (!email) {
      setWarning({ visible: true, message: "Please Login first!" });
      navigate("/login");
      return;
    }
    try {
      const result = await getUserInfo({ email: email });
      console.log("result is : ", result);
      if (result && result.statusCode == 200) {
        setUser(result.body);
      }
    } catch (error) {
      return;
    }
  };

  const handleChange = (type, data) => {
    setFormData({ ...formData, [type]: data });
  };

  const handleSubmit = async () => {
    console.log(formData);
  };

  return (
    <Container>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Image className="logo" src={logo} rounded />
            <span>Badminton Buddy</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Image className="avatar" src={avatar} rounded />
            <Navbar.Text>Hi {user.name}</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-5">
        {warning.visible && <Alert variant="warning">{warning.message}</Alert>}

        <h4 className="mb-4">
          Hi {user.name}, let's know more about you. lt helps us to find your
          badminton buddy!
        </h4>
        <Form>
          <Row>
            <Col xs={12} md={4} className="mb-3">
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  value={formData.gender}
                  onChange={(e) => {
                    handleChange("gender", e.target.value);
                  }}
                >
                  <option value="male">male</option>
                  <option value="female">female</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4} className="mb-3">
              <Form.Group controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  value={formData.age}
                  onChange={(e) => {
                    handleChange("age", e.target.value);
                  }}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={4} className="mb-3">
              <Form.Group controlId="location">
                <Form.Label>Your Location</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.location}
                  onChange={(e) => {
                    handleChange("location", e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4} className="mb-3">
              <Form.Group controlId="experience">
                <Form.Label>Year of Experience</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.experience}
                  onChange={(e) => {
                    handleChange("experience", e.target.value);
                  }}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={4} className="mb-3">
              <Form.Group controlId="playstyle">
                <Form.Label>Play Style</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="single"
                  checked={formData.playstyle.single}
                  onChange={(e) => {
                    console.log(e.target.checked);
                    handleChange("playstyle", {
                      ...formData.playstyle,
                      single: e.target.checked,
                    });
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="double"
                  checked={formData.playstyle.double}
                  onChange={(e) => {
                    handleChange("playstyle", {
                      ...formData.playstyle,
                      double: e.target.checked,
                    });
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="mix"
                  checked={formData.playstyle.mix}
                  onChange={(e) => {
                    handleChange("playstyle", {
                      ...formData.playstyle,
                      mix: e.target.checked,
                    });
                  }}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={4} className="mb-3">
              <Form.Group controlId="distance">
                <Form.Label>Matching Distance</Form.Label>
                <Form.Control
                  value={formData.matchdistance}
                  onChange={(e) => {
                    handleChange("matchdistance", e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="story">
            <Form.Label>Your Story</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Tell your buddies more about you"
              value={formData.story}
              onChange={(e) => {
                handleChange("story", e.target.value);
              }}
            />
          </Form.Group>

          <div className="mb-3">
            <Button className="w-100" variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>

          <div>
            <Button className="w-100" variant="light">
              Cancel
            </Button>
          </div>
        </Form>
      </Container>
    </Container>
  );
};

export default Firstvisit;
