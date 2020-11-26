import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Resetpass() {
  const emailRef = useRef();
  const { resetPass } = useAuth();
  const [error, setError] = useState("");
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setValid(true);
      await resetPass(emailRef.current.value);
      setMessage("Please check your email");
    } catch {
      setError("Failed to reset");
    }
    setValid(false);
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Pass</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>

            <Button disabled={valid} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-3">
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Resetpass;
