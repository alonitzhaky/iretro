import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutUs from './components/about-us/AboutUs';
import Footer from './components/Footer/Footer';
import Header from './components/header/Header';
import PhotoCarousel from './components/photo-carousel/PhotoCarousel';
import { Product } from './components/products/Product';

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
