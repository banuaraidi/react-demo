
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useAppContext } from "../../libs/contextLib";

export default function Login() {

  const { userHasAuthenticated } = useAppContext();

  const history = useHistory()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(email === 'user@demo.app' && password === '123' ) {
      userHasAuthenticated(true);
      history.push("/");
    }else{
      alert('email=user@demo.app and password=123');
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <Form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <FormGroup className="form-group">
            <FormLabel>Email address</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="form-control" 
              placeholder="user@demo.app"
            />
          </FormGroup>

          <FormGroup className="form-group">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={password}
              type='password'
              onChange={e => setPassword(e.target.value)}
              className="form-control" 
              placeholder="Enter password"
            />
          </FormGroup>
          <Button block bsSize="large" disabled={!validateForm()} type="submit" className="btn btn-primary btn-block">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}