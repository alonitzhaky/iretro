import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks';
import { registerUserAsync } from './authenticationSlice';

const Register = () => {
    const dispatch = useAppDispatch()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordconfirm, setPasswordConfirm] = useState("")
    const [email, setEmail] = useState("")

    const isValid = password === passwordconfirm;

    return (
        <div>
            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h2 className="text-center mb-4">Register</h2>
                        <Form>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Username</Form.Label>
                                <Form.Control required type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control required type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPasswordConfirm">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control required type="password" placeholder="Confirm Password" value={passwordconfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                            </Form.Group>
                            <br />
                            {isValid &&
                                <Button variant="primary" type="submit" className="btn btn-outline-success" onClick={() => dispatch(registerUserAsync({username, password, email}))}>
                                    Register
                                </Button> || 'The passwords are not identical. Try again.'}
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register;