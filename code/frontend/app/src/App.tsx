import React from 'react';
import Header from './components/header/Header';
import PhotoCarousel from './components/photo-carousel/PhotoCarousel';
import { Product } from './components/products/Product';

function App() {
  return (
    <div>
      <Header/>
      <br/>
      <PhotoCarousel/>
    </div>
  );
}

export default App;
