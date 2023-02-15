import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react'
import { Button, Card, Offcanvas } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addQuantity, removefromCart, removeQuantity, selectCart, updateTotal } from './cartSlice';
import { SERVER } from '../../env'
import Shipping from '../Order/Shipping';
import PaypalButton from '../Order/Paypalbutton';

const Cart = () => {
    const dispatch = useAppDispatch()
    const iretroBrown = "rgb(62,56,54)"
    const { total } = useAppSelector((state) => state.cart)
    const cart = useAppSelector(selectCart); // Cart imported from slicer
    const [show, setShow] = useState(false);
    const [productsInCart, setProductsInCart] = useState<{ id: string; price: number; image: string, name: string, quantity: number }[]>([]);
    const toggleShow = () => setShow(!show)

    useEffect(() => {
        const localStorageCart = localStorage.getItem("cart");
        if (localStorageCart) {
            setProductsInCart(JSON.parse(localStorageCart))
        }
    }, [cart])

    useEffect(() => {
        let total = 0
        productsInCart.forEach(product => {
            total += product.price * product.quantity
        })
        dispatch(updateTotal(Math.round((total + Number.EPSILON) * 100) / 100));
    }, [productsInCart])


    return (
        <div>
            <div onClick={() => toggleShow()}>
                <FontAwesomeIcon icon={faCartShopping} />
                <a>{" "}Cart</a>
            </div>
            <Offcanvas placement={"end"} show={show} onHide={() => toggleShow()}>
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
                                        Quantity: {product.quantity}
                                    </Card.Text>
                                    <Button style={{ backgroundColor: iretroBrown }} onClick={() => dispatch(removeQuantity(product.id))}>-</Button>
                                    {" "}
                                    <Button style={{ backgroundColor: iretroBrown }} onClick={() => dispatch(addQuantity(product.id))}>+</Button>
                                    <Card.Text>
                                        Price Per Item: {product.price}
                                    </Card.Text>
                                    <Button style={{ backgroundColor: iretroBrown }} onClick={() => dispatch(removefromCart(product.id))}>Remove</Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                    <br />
                    <hr />
                    Total: ${total}
                </Offcanvas.Body>
                {/* <Button style={{ backgroundColor: iretroBrown }}>Proceed To Checkout</Button> */}
                <PaypalButton />
                <Shipping />
            </Offcanvas>
        </div>
    )
}

export default Cart