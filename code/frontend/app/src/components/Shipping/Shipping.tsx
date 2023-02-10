// import React, { useState } from 'react'

// const Shipping = () => {
//     const [address, setAddress] = useState("")
//     const [city, setCity] = useState("")
//     const [postalCode, setPostalCode] = useState("")
//     const [country, setCountry] = useState("")

//     const submitHandler = (e: any) => {
//         e.preventDefault()
//         console.log("Submitted")
//     }
//     return (
//         <div>Shipping</div>
//     )
// }

// export default Shipping

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Shipping() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [country, setCountry] = useState("")
    const iretroBrown = "rgb(62,56,54)"

    const sumbitHandler = (e: any) => {
        e.preventDefault()
        console.log("Submitted")
    }

    return (
        <div>
            <Button style={{ backgroundColor: iretroBrown }} onClick={toggleShow}>
                Proceed To Checkout
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Shipping Information</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter Address'
                            value={address ? address : ''}
                            onChange={(e) => setAddress(e.target.value)}
                        >
                        </Form.Control>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter City'
                            value={city ? city : ''}
                            onChange={(e) => setCity(e.target.value)}
                        >
                        </Form.Control>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter Country'
                            value={country ? country : ''}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                        </Form.Control>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter Postal Code'
                            value={postalCode ? postalCode : ''}
                            onChange={(e) => setPostalCode(e.target.value)}
                        >
                        </Form.Control>
                        <br />
                        <Button style={{backgroundColor: iretroBrown}} type='submit' variant='primary' onClick={sumbitHandler}>
                            Continue
                        </Button>
                    </Form.Group>
                </Offcanvas.Body>
            </Offcanvas>
        </div>);
}

export default Shipping;