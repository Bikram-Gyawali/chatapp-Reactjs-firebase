import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, googleSignIn } = useAuth();
  const [error, setError] = useState("");
  const [valid, setValid] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setValid(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to login");
    }
    setValid(false);
  }

  return (
    <div style={{ minWidth: "400px", margin: "10vh 35vw" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>

            <Button disabled={valid} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <Button
            onClick={(e) => {
              e.preventDefault();
              googleSignIn()
                .then((result) => {
                  history.push("/");
                })
                .catch((error) => alert(error.message));
            }}
            className="w-100 btn btn-danger mt-2"
            type="submit"
          >
            Google
          </Button>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account ?<Link to="/signup">Sign up</Link>
      </div>
      <div className="w-100 text-center mt-3">
        <Link to="/resetpass">Forgotten Password ?</Link>
      </div>
    </div>
  );
}

export default Login;
