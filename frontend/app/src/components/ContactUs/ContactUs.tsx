import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react'
import { webColor } from '../../env';

const ContactUs = () => {
    const [showHR, setShowHR] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setShowHR(true);
        }, 1920); // delays appearance of <hr> element after all info has loaded.
    }, []);

    return (
        <div>
            <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" /></head>
            <h1 className="animate__animated animate__bounceIn" style={{ textAlign: "center", color: webColor }}>Need some help?</h1>
            {showHR && <hr style={{color: webColor}} className="animate__animated animate__fadeInUp" />}
            <div className='animate__animated animate__fadeInUp'>
                <p style={{ textAlign: "center" }}>Our goal was to make the purchasing experience as easy as possible.</p>
                <h3 style={{ textAlign: "center", color: webColor }}>But sometimes... We run into some issues.</h3>
                <p style={{ textAlign: "center" }}>We are here for you by e-mail, and you can expect a response from us between 1-2 business days.
                </p>
                <a className='d-flex justify-content-center' href="mailto:alon.itzhaky@gmail.com" target="_blank" style={{ color: webColor }}>
                    <FontAwesomeIcon icon={faEnvelope} />
                </a>
                {showHR && <hr style={{color: webColor}} className="animate__animated animate__fadeInUp" />}
                <h3 style={{ textAlign: "center", color: webColor }}>FAQ </h3>
                <p style={{ textAlign: "center" }}>Q: Where do you currently ship to?</p>
                <p style={{ textAlign: "center", opacity: "0.5" }}>A: We are only shipping to Israel at the moment,
                    yet we strive to ship worldwide in the near future.</p>
                <p style={{ textAlign: "center" }}>Q: How long will it be until I get my order?</p>
                <p style={{ textAlign: "center", opacity: "0.5" }}>A: With the help of UPS, your order will arrive within 5 business days, max.
                    We promise!</p>
                <p style={{ textAlign: "center" }}>Q: What are the differences between the DIY kit and the Fully-Built kit?</p>
                <p style={{ textAlign: "center", opacity: "0.5" }}>A: We know your time is valueable, so we offer the options of sending you the parts and building it yourself,
                    or we can provide you with a fully built frame, just to save some time {":)"}</p>



            </div>

        </div>
    )
}

export default ContactUs; 