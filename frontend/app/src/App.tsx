import React from 'react';
import AboutUs from './components/About-Us/AboutUs';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import PhotoCarousel from './components/Carousel/PhotoCarousel';
import Authentication from './components/Authentication/Authentication';
import Register from './components/Authentication/Register';
import ContactUs from './components/ContactUs/ContactUs';
import Profile from './components/Profile/Profile';
import UpdateInfo from './components/Profile/UpdateInfo';
import Shipping from './components/Order/Shipping';
import SingleProduct from './components/Products/SingleProduct';
import { Container } from 'react-bootstrap';
import { Routes, Route, Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/Errors/ErrorFallback';

import './bootstrap.min.css';


const Product = React.lazy(() => import('./components/Products/Product'))

function App() {
  return (
    <div>
      <Header />
      <main>
        <br />
        <Container>
          <Routes>
            <Route path="/" element={<PhotoCarousel />} />
            <Route path="/product/:id" element={
              <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
                <React.Suspense fallback={
                  <div>
                    <h1>Loading...</h1>
                  </div>
                }>
                  <Product />
                </React.Suspense>
              </ErrorBoundary>
            } />
            <Route path="/product/info/:id">
              <Route index element={<SingleProduct />}></Route>
              <Route path=":id" element={<SingleProduct />} />
            </Route>
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Authentication />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/update" element={<UpdateInfo />} />
            <Route path="/checkout" element={<Shipping />} />
          </Routes>
        </Container>
        <br />
      </main>
      <Outlet />
      <Footer />

    </div>
  );
}

export default App;
