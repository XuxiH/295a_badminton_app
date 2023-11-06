import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Signup() {
  const navigate = useNavigate();
  const handleRouteToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="form-signin w-100 m-auto">
      <Form>
        <div className="text-center mb-4">
          <Image className="logo" src={logo} rounded />
        </div>
        <h1 className="h3 mb-3 fw-normal text-center">Sign Up</h1>

        <Form.Group className="mb-3" controlId="exampleForm.username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Type your username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Type your password" />
        </Form.Group>

        <Button className="w-100 btn btn-lg btn-primary" variant="primary">
          Sign Up
        </Button>
        <p className="mt-5 mb-3 text-muted text-center">
          <span className="text-primary" onClick={handleRouteToLogin}>
            Back to Sign In
          </span>
        </p>
      </Form>
    </div>
  );
}

export default Signup;
