import React, { useEffect } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUserProfileAsync } from './profileSlice';
import { SERVER } from '../../env';

const Profile = () => {
    const iretroBrown = "rgb(62,56,54)";
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getUserProfileAsync())

    }, [])

    const { first_name, last_name, username, admin, email, image } = useAppSelector((state) => state.profile)
    return (
        <div className='text-center'>
            <h1 style={{ color: iretroBrown }}>
                User Profile
            </h1>
            <hr />
            <Card className='d-flex justify-content-center'>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col xs={6}><strong>Name:</strong></Col>
                                <Col>{first_name} {last_name}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={6}><strong>Username:</strong></Col>
                                <Col>{username}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col xs={6}><strong>Email Address:</strong></Col>
                                <Col>{email}</Col>
                            </Row>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <Row>
                                <Col xs={6}><strong>Profile Picture:</strong></Col>
                                <Col>
                                <img style={{ maxWidth: "200px", maxHeight: "400px"}} src={SERVER + image} />
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            {admin === true &&
                                <Row>
                                    <Col xs={6}><strong>Status:</strong></Col>
                                    <Col>Staff</Col>
                                </Row>
                            }
                            {admin === false &&
                                <Row>
                                    <Col xs={6}><strong>Status:</strong></Col>
                                    <Col>Active Customer</Col>
                                </Row>
                            }
                        </ListGroup.Item>
                        <br />
                        <div>
                            <Link to={'/profile/update'}>
                                <Button style={{ color: iretroBrown }} variant="primary" type="submit" className='btn btn-light'>Click Here to Update Information</Button>
                            </Link>
                        </div>
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Profile