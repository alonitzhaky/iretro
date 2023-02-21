import React from 'react'
import { webColor } from '../../env';
import './style.css'

const Error404 = () => {
  return (
    <div id='notfound'>
      <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Montserrat:900" rel="stylesheet" />
      <div className="notfound">
        <div className='notfound-404'>
          <h3>Oops! Page not found.</h3>
          <h1><span>4</span><span>0</span><span>4</span></h1>
        </div>
        <div className='notfound-404-click' >
          <h3 style={{color: webColor}}>we are sorry, but the page you requested was not found.</h3>
          <br />
          <h3 style={{color: webColor}}>Please click <a style={{color: "rgb(77,57,45)"}} href="https://iretro.netlify.app/">here</a> to go back to the homepage.</h3>
        </div>
      </div>
    </div>
  )
}

export default Error404;