import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react'
import { Button, Card, Offcanvas } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addQuantity, removefromCart, removeQuantity, selectCart, updateTotal } from './cartSlice';
import { SERVER, webColor } from '../../env'
import Shipping from '../Order/Shipping';

const Cart = () => {
    const dispatch = useAppDispatch()
    const { total } = useAppSelector((state) => state.cart)
    const cart = useAppSelector(selectCart); // Cart imported from slicer
    const [show, setShow] = useState(false);
    const [productsInCart, setProductsInCart] = useState<{ id: string; price: number; image: string, name: string, quantity: number }[]>([]);
    // const toggleShow = () => setShow(!show)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    useEffect(() => {
        const localStorageCart = localStorage.getItem("cart");
        if (localStorageCart) {
            setProductsInCart(JSON.parse(localStorageCart))
        }
    }, [cart])

    useEffect(() => {
        if (cart.length) {
            handleShow()
        }
        let total = 0
        productsInCart.forEach(product => {
            total += product.price * product.quantity
        })
        dispatch(updateTotal(Math.round((total + Number.EPSILON) * 100) / 100));
    }, [productsInCart])


    return (
        <div>
            <div onClick={handleShow}>
                <FontAwesomeIcon icon={faCartShopping} />
                <a>{" "}Cart</a>
            </div>
            <Offcanvas placement={"end"} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {productsInCart.map((product, index) => {
                        return (
                            <Card key={index}>
                                <br />
                                <Card.Img className="d-block mx-auto" variant="top" src={SERVER + product.image} style={{ width: "150px", height: "150px", textAlign: "center" }} />
                                <Card.Body>
                                    <Card.Title>
                                        {product.name}
                                    </Card.Title>
                                    <Card.Text>
                                        ${product.price}
                                    </Card.Text>
                                    <Card.Text>
                                        Quantity: {product.quantity}
                                    </Card.Text>
                                    <Button style={{ backgroundColor: webColor }} onClick={() => dispatch(removeQuantity(product.id))}>-</Button>
                                    {" "}
                                    <Button style={{ backgroundColor: webColor }} onClick={() => dispatch(addQuantity(product.id))}>+</Button>
                                    {" "}
                                    <Button style={{ backgroundColor: webColor, marginLeft: "100px" }} onClick={() => dispatch(removefromCart(product.id))}>Remove</Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                    <br />
                    <hr />
                    <h2 style={{ color: webColor }} className='text-center'>Total: ${total.toFixed(2)}</h2>
                </Offcanvas.Body>
                <Shipping />
            </Offcanvas>
        </div>
    )
}

export default Cart