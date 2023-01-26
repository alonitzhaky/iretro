import React from 'react'
import { Container, Navbar, Nav, NavItem, NavLink } from 'react-bootstrap';
import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <a href="/"><img src="./logo.png" alt="Bootstrap" width="80" height="80"></img></a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="navbarColor01" >
            <Nav navbar>
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
                <NavLink href="#">Contact</NavLink>
              </NavItem>
            </Nav>
            <Navbar.Text>
            <a href="tel:+972547144714" target="_blank" style={{ color: "white" }}>
                <FontAwesomeIcon icon={faPhone} />
              </a>
            </Navbar.Text>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header 