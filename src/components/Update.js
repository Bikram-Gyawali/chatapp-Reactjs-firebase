import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

function Update() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePass } = useAuth();
  const [error, setError] = useState("");
  const [valid, setValid] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password did not matched");
    }
    const newupdate = [];
    setValid(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      newupdate.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      newupdate.push(updatePass(passwordRef.current.value));
    }
    Promise.all(newupdate)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("failed to update account");
      })
      .finally(() => {
        setValid(false);
      });
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="leave blank to store same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="leave blank to store same"
              />
            </Form.Group>
            <Button disabled={valid} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </div>
  );
}

export default Update;
