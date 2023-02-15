// import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { useAppDispatch, useAppSelector } from '../../app/hooks'
// import Reviews from '../Reviews/Reviews'
// import { getOneProductAsync } from './productSlice'

// const SingleProduct = () => {
//   const rating = useAppSelector((state) => state.review.rating)
//   const { product } = useAppSelector((state) => state.product)
//   console.log(product)
//   const iretroBrown = "rgb(62,56,54)";
//   let { id } = useParams()
//   const dispatch = useAppDispatch()
//   useEffect(() => {
//     dispatch(getOneProductAsync(Number(id)))

//   }, [])

//   return (
//     <div className='text-center'>
//       <h1 style={{ color: iretroBrown }}>More Info</h1>
//       <hr />
//       {/* {rating} */}
//       <samp>
//         <i className={rating >= 1 ? 'fas fa-star' : rating >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'} style={{ color: iretroBrown }}> </i>
//       </samp>
//       {/* Check if rating bigger 2 so i get a star or helf star  */}
//       <samp>
//         <i className={rating >= 2 ? 'fas fa-star' : rating >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'} style={{ color: iretroBrown }}> </i>
//       </samp>
//       {/* Check if rating bigger 3 so i get a star or helf star  */}
//       <samp>
//         <i className={rating >= 3 ? 'fas fa-star' : rating >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'} style={{ color: iretroBrown }}> </i>
//       </samp>
//       {/* Check if rating bigger 4 so i get a star or helf star  */}
//       <samp>
//         <i className={rating >= 4 ? 'fas fa-star' : rating >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'} style={{ color: iretroBrown }}> </i>
//       </samp>
//       {/* Check if rating bigger 5 so i get a star or helf star  */}
//       <samp>
//         <i className={rating >= 5 ? 'fas fa-star' : rating >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'} style={{ color: iretroBrown }}> </i>
//       </samp>
//       <span> {" "}
//         {rating && rating} / 5
//       </span>
//       <p>{product.name}</p>
//       <p>{product.description}</p>
//       <p>{product.price}</p>
//       <p>{product.id}</p>
//       <Reviews />
//     </div>
//   )
// }

// export default SingleProduct

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Reviews from '../Reviews/Reviews';
import { getOneProductAsync } from './productSlice';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import { SERVER } from '../../env';
import { addtoCart } from '../Cart/cartSlice';

const SingleProduct = () => {
  const iretroBrown = "rgb(62,56,54)";
  const rating = useAppSelector((state) => state.review.rating);
  const { product } = useAppSelector((state) => state.product);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOneProductAsync(Number(id)));
  }, [dispatch, id]);

  return (
    <Container>
      <h1 className='text-center my-4'>{product.name}</h1>
      <Row className='my-4'>
        <Col md={6} className='text-center'>
          <Image src={SERVER + product.image} alt={product.name} fluid />
        </Col>
        <Col md={6}>
          <Card className='p-4'>
            <p className='my-4'>{product.description}</p>
            <p className='h4 font-weight-bold'>
              ${product.price}
            </p>
            {/* Add Quantity useState */}
            {product.quantity > 0 ? (
                  <div>
                    <Button onClick={() => dispatch(addtoCart({ id: product.id, price: product.price, name: product.name, image: product.image }))} style={{ backgroundColor: iretroBrown }} className="mt-3">
                      Add to Cart
                    </Button>
                  </div>
                ) : (
                  <Button className="disabled mt-3" style={{ backgroundColor: iretroBrown, opacity: "50%" }}>
                    Out Of Stock
                  </Button>
                )}
            <hr />
            <h4 className='my-3'>Reviews</h4>
            <div className='d-flex align-items-center'>
              <span>
                <i
                  className={
                    rating >= 1 ? 'fas fa-star' : rating >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'
                  }
                ></i>
              </span>
              <span>
                <i
                  className={
                    rating >= 2 ? 'fas fa-star' : rating >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'
                  }
                ></i>
              </span>
              <span>
                <i
                  className={
                    rating >= 3 ? 'fas fa-star' : rating >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'
                  }
                ></i>
              </span>
              <span>
                <i
                  className={
                    rating >= 4 ? 'fas fa-star' : rating >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'
                  }
                ></i>
              </span>
              <span>
                <i
                  className={
                    rating >= 5 ? 'fas fa-star' : rating >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'
                  }
                ></i>
              </span>
              <span className='ml-2'> {" "}
                {rating && rating} / 5
              </span>
            </div>
            <Reviews />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleProduct;
