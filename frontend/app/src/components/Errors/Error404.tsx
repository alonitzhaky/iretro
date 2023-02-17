import React from 'react'

const Error404 = () => {
  const iretroBrown = "rgb(62,56,54)"
  return (
    <div className='text-center'>
      <h1>
        Someone is snooping too much...
      </h1>
      <hr />

      <p>We know you want to test our code, but sorry - you reached a dead-end.</p>
      <p>Please click {" "}
        <a style={{color: "#805F4B", fontWeight: "bold"}} href='http://iretro.netlify.app'>here</a>
        {" "} to go back to the main page.</p>
    </div>
  )
}

export default Error404;