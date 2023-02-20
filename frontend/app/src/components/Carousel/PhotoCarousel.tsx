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
            <h3 style={{ color: "white" }}>iRetro - Preserve Your Technology</h3>
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

          <Carousel.Caption>
            <h3 style={{ color: "white" }}>Second slide label</h3>
            <p style={{ color: "black" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            // className="d-block w-100"
            style={{ width: "100%", height: "700px", objectFit: "cover" }}
            src="gridse.webp"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3 style={{ color: "black" }}>Third slide label</h3>
            <p style={{ color: "black" }}>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default PhotoCarousel;

