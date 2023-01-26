import React from "react";
import Carousel from "react-bootstrap/Carousel";

const PhotoCarousel = () => {
  return (
    <div>
      <br/>
      <Carousel slide={true}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="grid4s.webp"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 style={{color:"white"}}>iRetro - Preserve Your Technology</h3>
            <p>Keep your old iPhone, showing off its internal beauty.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="grid4s.webp"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3 style={{color:"white"}}>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="grid4s.webp"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3 style={{color:"white"}}>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      
    </div>
  );
};

export default PhotoCarousel;
