import React, { useState, useEffect } from 'react'
import { Container, Navbar, Nav, NavItem, NavLink } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [token, setToken] = useState("")
  const [userName, setUserName] = useState("")
  useEffect(() => {
    if(!token){
      const storedToken = localStorage.getItem("token")
      setToken(JSON.parse(String(storedToken)))
    }
  }, [])
  useEffect(() => {
    if(!userName){
      const storedUserName = localStorage.getItem("username")
      setUserName(JSON.parse(String(storedUserName)))
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
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/about">About Us</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/shop">Shop</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/contact">Contact</NavLink>
                </NavItem>
            </Nav>
            <Nav style={{margin: "0 5px"}}>
              <Navbar.Text>
                <a href="tel:+972547144714" target="_blank" style={{ color: "white", margin: "0 10px"}}>
                  <FontAwesomeIcon icon={faPhone} />
                  <a>{" "}Call Us</a>
                </a>
                {"|"}
                <a href="/cart" target="_blank" style={{ color: "white", margin: "0 10px"}}>
                  <FontAwesomeIcon icon={faCartShopping}/>
                  <a>{" "}Cart</a>
                </a>
                {"|"}
                <a href="/login" style={{ color: "white", margin: "0 10px"}}>
                  <FontAwesomeIcon icon={faUser}/>
                  {token ? ` ${userName}` : <a>{" "}Log in</a>}
                </a>
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header 