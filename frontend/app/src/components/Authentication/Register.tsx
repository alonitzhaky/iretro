import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks';
import { registerUserAsync } from './authenticationSlice';

const Register = () => {
    const iretroBrown = "rgb(62,56,54)"
    const dispatch = useAppDispatch()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordconfirm, setPasswordConfirm] = useState("")
    const [email, setEmail] = useState("")


    const isValid = password === passwordconfirm;

    return (
        <div>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h2 style={{color: iretroBrown}} className="text-center mb-4">Register</h2>
                        <Form>
                        <Form.Group controlId="formBasicFirstName">
                                <div className='d-flex justify-content-center'>
                                    <Form.Label>First Name</Form.Label>
                                </div>
                                <Form.Control required type="text" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicLastName">
                                <div className='d-flex justify-content-center'>
                                    <Form.Label>Last Name</Form.Label>
                                </div>
                                <Form.Control required type="text" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicUserName">
                                <div className='d-flex justify-content-center'>
                                    <Form.Label>Username</Form.Label>
                                </div>
                                <Form.Control required type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <div className='d-flex justify-content-center' style={{ margin: "5px" }}>
                                    <Form.Label>Email</Form.Label>
                                </div>
                                <Form.Control required type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <div className='d-flex justify-content-center' style={{ margin: "5px" }}>
                                    <Form.Label>Password</Form.Label>
                                </div>
                                <Form.Control required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPasswordConfirm">
                                <div className='d-flex justify-content-center' style={{ margin: "5px" }}>
                                    <Form.Label>Confirm Password</Form.Label>
                                </div>
                                <Form.Control required type="password" placeholder="Confirm Password" value={passwordconfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                            </Form.Group>
                            <br />
                            {isValid &&
                                <div className='d-flex justify-content-center'>
                                    <Button style={{color: iretroBrown}} variant="primary" className='btn btn-light' onClick={() => dispatch(registerUserAsync({ username, password, email, first_name: firstName, last_name: lastName }))}>
                                        Register
                                    </Button>
                                </div> || 'The passwords are not identical. Try again.'}
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register;