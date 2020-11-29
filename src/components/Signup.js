import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, googleSignIn } = useAuth();
  const [error, setError] = useState("");
  const [valid, setValid] = useState(false);
  const history = useHistory();
  const [userInfo, setuserInfo] = useState();
  const [userName, setUserName] = useState();
  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password did not matched");
    }
    try {
      setError("");
      setValid(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
      // console.log(signup);
    } catch {
      setError("Failed to create an account");
    }
    setValid(false);
  }
  // const signIn = async () => {
  //   await googleSignIn()
  //     .then((result) => {
  //       // setuserInfo(result);
  //       // setUserName(result.user.displayName);
  //       history.push("/");
  //       console.log(result);
  //     })
  //     .catch((error) => alert(error.message));
  //   setValid(false);
  // };
  // console.log(userInfo);
  return (
    <div style={{ minWidth: "400px", margin: "10vh 35vw" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={valid} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
          <Button
            onClick={(e) => {
              e.preventDefault();
              googleSignIn()
                .then((result) => {
                  setuserInfo(result);
                  setUserName(result.user.displayName);
                  history.push("/");
                  console.log(result);
                })
                .catch((error) => alert(error.message));
            }}
            disabled={valid}
            className="w-100 btn btn-danger mt-2"
            type="submit"
          >
            Google
          </Button>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account ?<Link to="/login">Log In</Link>
      </div>
    </div>
  );
}

export default Signup;
