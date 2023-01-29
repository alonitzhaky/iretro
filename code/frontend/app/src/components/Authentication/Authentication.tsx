import React, { useState } from "react";
import { selectIsLogged, loginUserAsync} from "./authenticationSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Form, Button } from 'react-bootstrap'

const Authentication = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const logged = useAppSelector(selectIsLogged);
  const dispatch = useAppDispatch();
  return (
    <div>
      <h1>Login</h1>
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='username'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
        <Button className="btn btn-outline-success" style={{ margin: '20px' }} onClick={() => dispatch(loginUserAsync({ username, password }))} >Login</Button>
      </Form>
    </div>
  )
}

export default Authentication