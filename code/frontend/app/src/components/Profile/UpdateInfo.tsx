import React, { useState } from 'react'
import { Button, Card, Form, ListGroup } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { updateUserProfileAsync } from './profileSlice';

const UpdateInfo = () => {
    const dispatch = useAppDispatch()
    const { first_name, last_name, username, admin, image } = useAppSelector((state) => state.profile)
    const [firstName, setFirstName] = useState(first_name)
    const [lastName, setLastName] = useState(last_name)
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [picture, setPicture] = useState("")
    const iretroBrown = "rgb(62,56,54)";

    const handleUpdate = () => {
        dispatch(updateUserProfileAsync({
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            address: address,
            image: image,
            admin: false,
            username: username,
        }));
    };
    return (
        <div>
            <div className='text-center'>
                <h1 style={{ color: iretroBrown }}>
                    Update Your Information
                </h1>
            </div>
            <Card className='d-flex justify-content-center'>
                <Card.Body>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Form className='text-center'>
                                <Form.Group controlId='changeFirstName'>
                                    <Form.Label>
                                        First Name:
                                    </Form.Label>
                                    <Form.Control type='text' value={firstName} placeholder="John" onChange={(e) => setFirstName(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='changeLastName'>
                                    <Form.Label>
                                        Last Name:
                                    </Form.Label>
                                    <Form.Control type='text' value={lastName} placeholder="Doe" onChange={(e) => setLastName(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='changeEmail'>
                                    <Form.Label>
                                        Email Address:
                                    </Form.Label>
                                    <Form.Control type='text' value={email} placeholder="john@doe.com" onChange={(e) => setEmail(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='changePhone'>
                                    <Form.Label>
                                        Phone Number:
                                    </Form.Label>
                                    <Form.Control type='text' value={phone} placeholder="555-123-4567" onChange={(e) => setPhone(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='changeShippingAddress'>
                                    <Form.Label>
                                        Address:
                                    </Form.Label>
                                    <Form.Control type='text' value={address} placeholder="123 Wall St." onChange={(e) => setAddress(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='formFile'>
                                    <Form.Label>
                                        Image:
                                    </Form.Label>
                                    <Form.Control type="file" onChange={(e) => setPicture(e.target.value)} />
                                </Form.Group>
                                <br />
                                <Button style={{ color: iretroBrown }} variant='primary' onClick={() => dispatch(updateUserProfileAsync({
                                    first_name: firstName,
                                    last_name: lastName,
                                    email: email,
                                    phone: phone,
                                    address: address,
                                    image: image,
                                    admin: false,
                                    username: username,
                                }))} className='btn btn-light'>
                                    Update Info
                                </Button>
                            </Form>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UpdateInfo