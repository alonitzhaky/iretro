import React from 'react'

const AboutUs = () => {
  const iretroBrown = "rgb(62,56,54)"
  return (
    <div>
      <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/></head>
      <h1 className='animate__animated animate__fadeInUp' style={{ textAlign: "center", color: iretroBrown }}>About Us</h1>
      <hr />
      <div className='animate__animated animate__fadeInUp'>
        <p style={{ textAlign: "center" }}>We believe every piece of techology should be cherished and kept as a piece of memory.</p>
        <h3 style={{ textAlign: "center", color: iretroBrown }}>So We Did. </h3>
        <p style={{ textAlign: "center" }}>Our purpose here is to give the tech community something to hold on to, to appreciate the beauty of how technology has progressed over time.
          We offer our customers the option to get their own kits to build it themselves, or the ease of mind with our pre-built framed devices.
          <br />
          Because in the end...
        </p>
        <h3 style={{ textAlign: "center", color: iretroBrown }}>We want to make things EASIER. </h3>
        <p style={{ textAlign: "center" }}>We hope you join us in our journey to keep the nostalgia in the present.</p>
      </div>
    </div>
  )
}

export default AboutUs