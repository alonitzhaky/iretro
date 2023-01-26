import React from 'react';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4">
            <Container className='text-center'>
                <a href="https://github.com/alonitzhaky" target="_blank" style={{ color: "white" }}>
                    <FontAwesomeIcon icon={faGithub} style={{margin: "0 10px"}}/>
                </a>
                <a href="https://www.instagram.com/alon.itzhaky" target="_blank" style={{ color: "white" }}>
                    <FontAwesomeIcon icon={faInstagram} style={{margin: "0 10px"}}/>
                </a>
                <a href="tel:+972547144714" target="_blank" style={{ color: "white" }}>
                    <FontAwesomeIcon icon={faLinkedin} style={{margin: "0 10px"}}/>
                </a>
            </Container>
            <br/>
            <p className="text-center">Copyright &copy; {new Date().getFullYear()} Alon Itzhaky</p>
        </footer>
    );
}

export default Footer;