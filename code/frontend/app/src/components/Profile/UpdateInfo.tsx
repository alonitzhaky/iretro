import React, { useState } from 'react'
import { Button, Card, Form, ListGroup } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { updateUserProfileAsync } from './profileSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UpdateInfo = () => {
    const dispatch = useAppDispatch()
    const { first_name, last_name, image, email, address, phone_number } = useAppSelector((state) => state.profile)
    const [firstName, setFirstName] = useState(first_name)
    const [lastName, setLastName] = useState(last_name)
    const [emailAddress, setEmailAddress] = useState(email)
    const [phone, setPhone] = useState(phone_number)
    const [shippingAddress, setShippingAddress] = useState(address)
    const [picture, setPicture] = useState<any>();
    const iretroBrown = "rgb(62,56,54)";

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPicture(e.target.files ? e.target.files[0] : undefined);
    }

    const handleUpdate = (e: any) => {
        e.preventDefault()
        const formData = new FormData()
        if (picture) {
            formData.append('image', picture)
        }
        formData.append('first_name', firstName)
        formData.append('last_name', lastName)
        formData.append('email', emailAddress)
        formData.append('phone_number', phone)
        formData.append('address', shippingAddress)
        dispatch(updateUserProfileAsync(formData))
    }

    return (
        <div>
            <>
                <ToastContainer />
            </>
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
                                    <Form.Control type='text' value={emailAddress} placeholder="john@doe.com" onChange={(e) => setEmailAddress(e.target.value)}>
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
                                    <Form.Control type='text' value={shippingAddress} placeholder="123 Wall St." onChange={(e) => setShippingAddress(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='formFile'>
                                    <Form.Label>
                                        Image:
                                    </Form.Label>
                                    <Form.Control type="file" onChange={handleImageChange} />
                                </Form.Group>
                                <br />
                                <Button style={{ color: iretroBrown }} variant='primary' onClick={handleUpdate} className='btn btn-light'>
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