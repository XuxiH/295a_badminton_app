import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const handleRouteToSignUp = () => {
    navigate("/signup");
  };
  return (
    <div className="form-signin w-100 m-auto">
      <Form>
        <div className="text-center mb-4">
          <Image className="logo" src={logo} rounded />
        </div>
        <h1 className="h3 mb-3 fw-normal text-center">Login</h1>
        <Form.Group className="mb-3" controlId="exampleForm.username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Type your username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Type your password" />
        </Form.Group>

        <div className="form-tip checkbox mb-3">
          <Form.Check type="checkbox" label="Remember me" />
          <span>Forgot password?</span>
        </div>
        <Button className="w-100 btn btn-lg btn-primary" variant="primary">
          Sign in
        </Button>
        <p className="mt-5 mb-3 text-muted text-center">
          Or{" "}
          <span className="text-primary" onClick={handleRouteToSignUp}>
            Sign Up
          </span>
        </p>
      </Form>
    </div>
  );
}

export default Login;
