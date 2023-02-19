import React from 'react';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-2">
            <Container className='text-center'>
                <a href="https://github.com/alonitzhaky" target="_blank" style={{ color: "white" }}>
                    <FontAwesomeIcon icon={faGithub} style={{margin: "0 10px"}}/>
                </a>
                <a href="https://www.instagram.com/alon.itzhaky" target="_blank" style={{ color: "white" }}>
                    <FontAwesomeIcon icon={faInstagram} style={{margin: "0 10px"}}/>
                </a>
                <a href="https://www.linkedin.com/in/alonitzhaky/" target="_blank" style={{ color: "white" }}>
                    <FontAwesomeIcon icon={faLinkedin} style={{margin: "0 10px"}}/>
                </a>
            </Container>
            <br/>
            <p className="text-center">Copyright &copy; {new Date().getFullYear()} Alon Itzhaky</p>
        </footer>
    );
}

export default Footer;