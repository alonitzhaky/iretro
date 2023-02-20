import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Reviews from '../Reviews/Reviews';
import { getOneProductAsync, selectIsLoadingProduct } from './productSlice';
import { Container, Row, Col, Image, Button, Card, Form } from 'react-bootstrap';
import { SERVER, webColor } from '../../env';
import { addtoCart } from '../Cart/cartSlice';
import Spinner from '../Design/Spinner';

const SingleProduct = () => {
  const { id } = useParams();
  const isLoading = useAppSelector(selectIsLoadingProduct)
  const rating = useAppSelector((state) => state.review.rating);
  const { product } = useAppSelector((state) => state.product);
  const [productQuantity, setProductQuantity] = useState(1)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOneProductAsync(Number(id)));
  }, [id]);


  if (!product) return null;

  if (isLoading) return <Spinner clx='d-flex justify-content-center' />
  return (
    <Container>
      <Row className='my-4'>
        <Col md={6} className='text-center'>
          <Image src={SERVER + product.image} alt={product.name} fluid />
        </Col>
        <Col md={6}>
          <Card className='p-4'>
            <h1 style={{ color: "black" }} className='text-center my-4'>{product.name}</h1>
            <p className='my-4'>{product.description}</p>
            <p className='h4 font-weight-bold'>
              ${product.price}
            </p>
            {product.quantity > 0 &&
              <Form.Control
                className="quantity-selector"
                as="select"
                onChange={(e) => setProductQuantity(+e.target.value)}
                value={productQuantity}
              >
                {[...Array(product.quantity)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    Quantity Selected: {index + 1}
                  </option>
                ))}
              </Form.Control>
            }
            {product.quantity > 0 ? (
              <div className='d-flex justify-content-center'>
                <Button onClick={() => dispatch(addtoCart({ id: product.id, price: Number(product.price), name: product.name, image: product.image, quantity: productQuantity }))} style={{ backgroundColor: webColor }} className="mt-3">
                  Add to Cart
                </Button>
              </div>
            ) : (
              <Button className="disabled mt-3" style={{ backgroundColor: webColor, opacity: "50%" }}>
                Out Of Stock
              </Button>
            )}
            <hr />
            <div className="d-flex justify-content-center align-items-center">
              <h2 style={{ color: "black" }}>Ratings</h2>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <span key={i}>
                    <i className={rating >= ratingValue ? "fas fa-star" : rating >= ratingValue - 0.5 ? "fas fa-star-half-alt" : "far fa-star"}
                    ></i>
                  </span>
                );
              })}
              <span>{"‏‏‎ ‎"}{rating && rating} / 5</span>
            </div>
            <Reviews />
          </Card>
        </Col>
      </Row>
    </Container >
  );
};

export default SingleProduct;
