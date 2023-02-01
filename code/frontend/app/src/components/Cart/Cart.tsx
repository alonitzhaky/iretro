import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react'
import { Button, Card, Offcanvas } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addQuantity, removefromCart, removeQuantity, selectCart } from './cartSlice';
import { SERVER } from '../../env'

const Cart = () => {
    const dispatch = useAppDispatch()
    const cart = useAppSelector(selectCart); // Cart imported from slicer
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [productsInCart, setProductsInCart] = useState<{ id: string; price: number; image: string, name: string, quantity:number }[]>([]);

    let totalCart = 0
    useEffect(() => {
        const localStorageCart = localStorage.getItem("cart");
        if (localStorageCart) {
            setProductsInCart(JSON.parse(localStorageCart))
        }
        if (cart.length) {
            handleShow()
        }
    }, [cart])

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
                        totalCart += Number(product.price * product.quantity)
                        return (
                            <Card key={index}>
                                <br />
                                <Card.Img className="d-block mx-auto" variant="top" src={SERVER + product.image} style={{ width: "100px", height: "100px", textAlign: "center" }} />
                                <Card.Body>
                                    <Card.Title>
                                        {product.name}
                                    </Card.Title>
                                    <Card.Text>
                                        Quantity: {product.quantity}
                                    </Card.Text>
                                    <Button onClick={() => dispatch(removeQuantity(product.id))}>-</Button>
                                    {" "}
                                    <Button onClick={() => dispatch(addQuantity(product.id))}>+</Button>
                                    <Card.Text>
                                        Price Per Item: {product.price}
                                    </Card.Text>
                                    <Button onClick={() => dispatch(removefromCart(product.id))}>Remove</Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                    <br />
                    <hr />
                    Total: ${totalCart}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default Cart