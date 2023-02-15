import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { newOrderAsync } from './orderSlice';

function Shipping() {
    const { cart, total } = useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch()
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    const [show, setShow] = useState(false);
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [zip_code, setZip_code] = useState("")
    const [country, setCountry] = useState("")
    const iretroBrown = "rgb(62,56,54)"
    
    const sumbitHandler = (e: any) => {
        e.preventDefault()
        const orderData = {
            address,
            city,
            zip_code,
            country, 
            total: total
        };

        dispatch(newOrderAsync({ orderData, orderDetails: cart }))
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
                            value={zip_code ? zip_code : ''}
                            onChange={(e) => setZip_code(e.target.value)}
                        >
                        </Form.Control>
                        <br />
                        <Button
                            style={{ backgroundColor: iretroBrown }}
                            type='submit'
                            variant='primary'
                            onClick={sumbitHandler}
                            disabled={!address || !city || !country || !zip_code}
                        >
                            Continue
                        </Button>
                    </Form.Group>
                </Offcanvas.Body>
            </Offcanvas>
        </div>);
}

export default Shipping;