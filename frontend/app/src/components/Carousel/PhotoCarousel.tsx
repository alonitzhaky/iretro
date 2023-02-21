import React from "react";
import Carousel from "react-bootstrap/Carousel";

const PhotoCarousel = () => {

  return (
    <div className="justify-content-center">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
      <br />
      <Carousel className="animate__animated animate__fadeIn" slide={true} interval={3000} >
        <Carousel.Item>
          <img
            // className="d-block w-100"
            style={{ width: "100%", height: "700px", objectFit: "cover" }}
            src="grid4s.jpeg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h2 style={{ color: "white" }}>iRetro - Preserve Your Technology</h2>
            <p>Keep your old iPhone, showing off its internal beauty.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            // className="d-block w-100"
            style={{ width: "100%", height: "700px", objectFit: "cover" }}
            src="grid4.webp"
            alt="Second slide"
          />

          <Carousel.Caption style={{ color: "black" }}>
            <h2>A memory for a lifetime.</h2>
            <p>The perfect gift for the tech enthusiast!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            // className="d-block w-100"
            style={{ width: "100%", height: "700px", objectFit: "cover" }}
            src="gridse.webp"
            alt="Third slide"
          />

          <Carousel.Caption style={{ color: "black" }}>
            <h2>The internal beauty.</h2>
            <p>Even the smallest components have a story behind them.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default PhotoCarousel;

