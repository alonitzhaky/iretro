import React, { useEffect } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUserOrdersAsync, getUserProfileAsync } from "./profileSlice";
import { SERVER, webColor } from "../../env";

const Profile = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getUserProfileAsync());
        dispatch(getUserOrdersAsync());
    }, []);

    const { first_name, last_name, username, admin, email, image, address, phone_number } = useAppSelector((state) => state.profile);
    const { order } = useAppSelector((state) => state.profile);
    return (
        <div className="text-center">
            <h1 style={{ color: webColor }}>User Profile</h1>
            <hr />
            <Card className="d-flex justify-content-center">
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col xs={6}>
                                    <strong>Name:</strong>
                                </Col>
                                <Col>
                                    {first_name} {last_name}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={6}>
                                    <strong>Username:</strong>
                                </Col>
                                <Col>{username}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={6}>
                                    <strong>Phone Number:</strong>
                                </Col>
                                <Col>{phone_number}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={6}>
                                    <strong>Email Address:</strong>
                                </Col>
                                <Col>{email}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={6}>
                                    <strong>Shipping Address:</strong>
                                </Col>
                                <Col>{address}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={6}>
                                    <strong>Profile Picture:</strong>
                                </Col>
                                <Col>
                                    <img
                                        className="profile-image"
                                        style={{ maxWidth: "200px", maxHeight: "400px" }}
                                        src={SERVER + image}
                                    />
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {/* Present if the user has admin privileges. */}
                        <ListGroup.Item>
                            {admin === true && (
                                <Row>
                                    <Col xs={6}>
                                        <strong>Administrator Privileges:</strong>
                                    </Col>
                                    <Col>{String(admin)}</Col>
                                </Row>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Container>
                                <Col className="d-flex justify-content-center">
                                    <h1 style={{ color: webColor }}>Orders</h1>
                                </Col>
                                <Row>
                                    {order.map((order_info) => (
                                        <Col key={order_info.id}>
                                            {" "}
                                            <Card>
                                                {" "}
                                                <Card.Header>
                                                    Order ID: {order_info.id}
                                                </Card.Header>{" "}
                                                <Card.Header>
                                                    Total Price: ${order_info.total}
                                                </Card.Header>{" "}
                                                <Card.Body>
                                                    {" "}
                                                    <Card.Title>
                                                        Order Date:{" "}
                                                        <br />
                                                        {new Date(order_info.order_date).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                weekday: "long",
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric",
                                                            }
                                                        )}
                                                    </Card.Title>{" "}
                                                    {order_info.products.map((product) => (
                                                        <div key={product.id}>
                                                            {" "}
                                                            <p>Product: {product.product_name}</p>{" "}
                                                            <p>Quantity: {product.quantity}</p>{" "}
                                                            <p>Total: {product.total}</p>{" "}
                                                        </div>
                                                    ))}{" "}
                                                </Card.Body>{" "}
                                            </Card>{" "}
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                        </ListGroup.Item>

                        <br />
                        <div>
                            <Link to={"/profile/update"}>
                                <Button
                                    style={{ color: webColor }}
                                    variant="primary"
                                    type="submit"
                                    className="btn btn-light"
                                >
                                    Click Here to Update Information
                                </Button>
                            </Link>
                        </div>
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Profile;