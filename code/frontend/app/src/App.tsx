import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutUs from './components/About-Us/AboutUs';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import PhotoCarousel from './components/Carousel/PhotoCarousel';
import { Product } from './components/Products/Product';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <br/>
        <Container>
          <Routes>
            <Route path="/" element={<PhotoCarousel />} />
            <Route path="/shop" element={<Product />} />
            {/* Temporary - need to fix CSS + Component Name */}
            <Route path="/about" element={<AboutUs/>} />
            <Route path="/" element={<PhotoCarousel />} />
          </Routes>
        </Container>
        <br/>
        <Footer/>
      </BrowserRouter>
    </div >
  );
}

export default App;
