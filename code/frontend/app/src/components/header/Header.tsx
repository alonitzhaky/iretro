import React from 'react'
import { Container, Image, Navbar, Nav, NavbarBrand, NavItem, NavLink } from 'react-bootstrap';
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark" style={{backgroundColor: "#3f3a36"}}>
        <Container fluid>
          <NavbarBrand href="#">
            <Image src="./logo.png" alt="Bootstrap" width="100" height="100" className="d-inline-block align-text-top" />
          </NavbarBrand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="navbarColor01">
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink href="#" active>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">About Us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Shop</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Contact</NavLink>
              </NavItem>
            </Nav>
            <Navbar.Text>
              <a href="https://github.com/alonitzhaking" target="_blank" style={{ color: "white" }}>
                <FontAwesomeIcon icon={faGithub} style={{ margin: "0 10px" }} />
              </a>
              <a href="https://www.instagram.com/alon.itzhaking" target="_blank" style={{ color: "white" }}>
                <FontAwesomeIcon icon={faInstagram} style={{ margin: "0 10px" }} />
              </a>
              <a href="tel:+972547144714" target="_blank" style={{ color: "white" }}>
              <FontAwesomeIcon icon={faPhone} style={{ margin: "0 10px" }} />
            </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header 