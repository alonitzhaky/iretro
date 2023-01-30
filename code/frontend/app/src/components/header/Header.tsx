import React, { useState, useEffect } from 'react'
import { Container, Navbar, Nav, NavItem, NavLink, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logoutUserAsync } from '../Authentication/authenticationSlice';

const Header = () => {
  const dispatch = useAppDispatch()
  const iretroBrown = "rgb(62,56,54)"
  const [token, setToken] = useState("")
  const [userName, setUserName] = useState("")
  const [isStaff, setIsStaff] = useState(false)
  useEffect(() => {
    if (!token) {
      const storedToken = localStorage.getItem("token")
      setToken(JSON.parse(String(storedToken)));
      const storedUser = localStorage.getItem("username")
      setUserName(JSON.parse(String(storedUser)));
      const isAdmin = localStorage.getItem("is_staff")
      setIsStaff(JSON.parse(String(isAdmin)))
    }
  }, [])

  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/"><img src='./logo.png' style={{ height: '60px' }}></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="navbarColor01" >
            <Nav className="me-auto">
              <NavItem>
                <NavLink as={Link} to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink as={Link} to="/about">About Us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink as={Link} to="/shop">Shop</NavLink>
              </NavItem>
              <NavItem>
                <NavLink as={Link} to="/contact">Contact</NavLink>
              </NavItem>
            </Nav>
            <Dropdown >
              <Dropdown.Toggle style={{ background: "transparent", border: "none", margin: "-10px" }}>
                <a style={{ color: "white", margin: "0 10px" }}>
                  <FontAwesomeIcon icon={faUser} />
                  {token ? ` ${userName}` : <a>{" "}Account</a>}
                </a>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {!token && <Dropdown.Item as={Link} to={"/login"}>Login</Dropdown.Item>}
                {isStaff && <Dropdown.Item href="http://127.0.0.1:8000/admin/">Admin Panel</Dropdown.Item>}
                {token && <Dropdown.Item onClick={() => dispatch(logoutUserAsync())} style={{ color: iretroBrown }}>
                  Logout
                </Dropdown.Item>}
              </Dropdown.Menu>
            </Dropdown>
            <Nav style={{ margin: "0 5px" }}>
              <Navbar.Text>
                <a href="tel:+972547144714" target="_blank" style={{ color: "white", margin: "0 10px" }}>
                  <FontAwesomeIcon icon={faPhone} />
                  <a>{" "}Call Us</a>
                </a>
                {"|"}
                <a href="/cart" target="_blank" style={{ color: "white", margin: "0 10px" }}>
                  <FontAwesomeIcon icon={faCartShopping} />
                  <a>{" "}Cart</a>
                </a>
                {"|"}
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header 