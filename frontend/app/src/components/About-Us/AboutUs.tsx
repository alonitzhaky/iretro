import React, { useState, useEffect } from 'react'
import { webColor } from '../../env'

const AboutUs = () => {
  const [showHR, setShowHR] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setShowHR(true);
    }, 1920); // delays appearance of <hr> element after all info has loaded.
  }, []);
  return (
    <div className='text-center'>
      <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" /></head>
      <h1 className='animate__animated animate__fadeInUp' style={{ color: webColor }}>About Us</h1>
      {showHR && <hr style={{ color: webColor }} className="animate__animated animate__fadeInUp" />}
      <div className='animate__animated animate__fadeInUp'>
        <p>We believe every piece of techology should be cherished and kept as a piece of memory.</p>
        <h1 style={{ color: webColor }}>So We Did. </h1>
        {showHR && <hr style={{ color: webColor }} className="animate__animated animate__fadeInUp" />}
        <p>Our purpose here is to give the tech community something to hold on to, to appreciate the beauty of how technology has progressed over time.
          We offer our customers the option to get their own kits to build it themselves, or the ease of mind with our pre-built framed devices.
          <br />
          Because in the end...
        </p>
        <h1 style={{ color: webColor }}>We want to make things EASIER. </h1>
        {showHR && <hr style={{ color: webColor }} className="animate__animated animate__fadeInUp" />}
        <p>We hope you join us in our journey to keep the nostalgia in the present.</p>
      </div>
    </div>
  )
}

export default AboutUs