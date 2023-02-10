import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import AboutUs from './components/About-Us/AboutUs';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import PhotoCarousel from './components/Carousel/PhotoCarousel';
import { Product } from './components/Products/Product';
import Authentication from './components/Authentication/Authentication';
import Register from './components/Authentication/Register';
import ContactUs from './components/ContactUs/ContactUs';
import Profile from './components/Profile/Profile';
import UpdateInfo from './components/Profile/UpdateInfo';
import Shipping from './components/Shipping/Shipping';

import './bootstrap.min.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <BrowserRouter>
      <Header />
      <main>
        <br/>
        <Container>
          <Routes>
            <Route path="/" element={<PhotoCarousel />} />
            <Route path="/shop" element={<Product />} />
            <Route path="/about" element={<AboutUs/>} />
            <Route path="/login" element={<Authentication />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/update" element={<UpdateInfo />} />
            <Route path="/checkout" element={<Shipping />} />
          </Routes>
        </Container>
        <br/>
        </main>
        <Outlet/>
        <Footer/>
      </BrowserRouter>
    </Provider>
);