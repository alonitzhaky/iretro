import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { selectCart } from '../Cart/cartSlice';
import { newAddress, newCity, newCountry, newZipCode, selectNewAddress, selectNewCity, selectNewCountry, selectNewZipCode } from './orderSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import PaypalButton from './Paypalbutton';

function Shipping() {
    const cart = useAppSelector(selectCart)
    const dispatch = useAppDispatch()
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    const [show, setShow] = useState(false);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');
    const iretroBrown = "rgb(62,56,54)"
    let total = 0
    useEffect(() => {
        for (let index = 0; index < cart.length; index++) {
            total += Math.round(cart[index].price * cart[index].quantity + Number.EPSILON) * 100 / 100;
        }
    }, [cart])

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
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            >
                        </Form.Control>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter City'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                        </Form.Control>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter Country'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            >
                        </Form.Control>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter Postal Code'
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                        >
                        </Form.Control>
                        <br />
                    </Form.Group>
                </Offcanvas.Body>
                <PaypalButton />
            </Offcanvas>
        </div>);
}

export default Shipping;