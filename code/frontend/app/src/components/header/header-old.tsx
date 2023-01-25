import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <div>
            <a className="navbar-brand" href="#">
              <img src="./logo.png" alt="Bootstrap" width="100" height="100" className="d-inline-block align-text-top" />
            </a>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
            aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">Home
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Shop</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
            <a href="https://github.com/alonitzhaky" target="_blank" style={{ color: "white" }}>
              <FontAwesomeIcon icon={faGithub} style={{ margin: "0 10px" }} />
            </a>
            <a href="https://www.instagram.com/alon.itzhaky" target="_blank" style={{ color: "white" }}>
              <FontAwesomeIcon icon={faInstagram} style={{ margin: "0 10px" }} />
            </a>
            <a href="tel:+972547144714" target="_blank" style={{ color: "white" }}>
              <FontAwesomeIcon icon={faPhone} style={{ margin: "0 10px" }} />
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header;