import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { getUserInfo, updateUserInfo } from "../api";

const Firstvisit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gender: "male",
    age: undefined,
    zipCode: undefined,
    experience: undefined,
    playStyle: "single",
    playFormat: "aggressive",
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
    // try {
    //   const result = await getUserInfo({ email: email });
    //   console.log("result is : ", result);
    //   if (result && result.statusCode == 200) {
    //     setUser(result.body);
    //   }
    // } catch (error) {
    //   return;
    // }
    const username = sessionStorage.getItem("username");
    setUser({ name: username });
  };

  const handleChange = (type, data) => {
    setFormData({ ...formData, [type]: data });
  };

  const handleSubmit = async () => {
    const useremail = sessionStorage.getItem("email");
    const result = await updateUserInfo({
      email: useremail,
      gender: formData.gender,
      age: formData.age,
      zipCode: formData.zipCode,
      experience: formData.experience,
      playStyle: formData.playStyle,
      playFormat: formData.playFormat,
      matchdistance: formData.matchdistance,
      yourStory: formData.story,
    });
    navigate("/questionair");
  };

  return (
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
            <Form.Group controlId="zipCode">
              <Form.Label>Your ZipCode</Form.Label>
              <Form.Control
                type="number"
                value={formData.zipCode}
                onChange={(e) => {
                  handleChange("zipCode", e.target.value);
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
            <Form.Group controlId="playStyle">
              <Form.Label>Play Style</Form.Label>
              <Form.Select
                value={formData.playStyle}
                onChange={(e) => {
                  handleChange("playStyle", e.target.value);
                }}
              >
                <option value="aggressive">aggressive</option>
                <option value="neutral">neutral</option>
                <option value="defensive">defensive</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={12} md={4} className="mb-3">
            <Form.Group controlId="playFormat">
              <Form.Label>Play Format</Form.Label>
              <Form.Select
                value={formData.playFormat}
                onChange={(e) => {
                  handleChange("playFormat", e.target.value);
                }}
              >
                <option value="single">single</option>
                <option value="double">double</option>
                <option value="mix">mix</option>
              </Form.Select>
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
  );
};

export default Firstvisit;
