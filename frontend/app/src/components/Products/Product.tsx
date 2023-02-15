import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { SERVER } from "../../env";
import { addtoCart } from "../Cart/cartSlice";
import BasicPagination from "../Design/BasicPagination";
import {
  selectProducts,
  getAllProductsInCategoryAsync,
} from "./productSlice";

export default function Product() {
  let { id } = useParams()
  const iretroBrown = "rgb(62,56,54)";
  const [productQuantity, setProductQuantity] = useState(1)
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProductsInCategoryAsync({ page: 1, id: Number(id) }));
  }, [id]);
  return (
    <div className="text-center">
      {Number(id) === 1 &&
        <h1 style={{ color: iretroBrown }}>DIY - Do It Yourself</h1>
      }
      {Number(id) === 2 &&
        <h1 style={{ color: iretroBrown }}>Fully Built Kits</h1>
      }
      {Number(id) === 3 &&
        <h1 style={{ color: iretroBrown }}>Spare Parts</h1>
      }
      <hr style={{ color: iretroBrown }} />
      {/* <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {products.map((product, index) => (
          <div key={index} className="card" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <Card.Img src={SERVER + product.image} style={{ objectFit: "cover" }} alt={product.name} />
            <hr />
            <p>ID: {product.id}</p>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
            <p>Quantity In Stock: {product.quantity}</p>
            <Link to={`/product/info/${product.id}/`}>
              <Button style={{ backgroundColor: iretroBrown }} className="mt-3">
                Details
              </Button>
            </Link>
            <br />
            <br />
            {product.quantity > 0 ? (
              <Form.Control as="select" onChange={(e) => setProductQuantity(+e.target.value)} value={productQuantity}>
                {[...Array(product.quantity)].map((amount, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </Form.Control>) : (
              <Button className="disabled mt-3" style={{ backgroundColor: iretroBrown, opacity: "50%" }}>
                Out Of Stock
              </Button>
            )}
            <br />
            {product.quantity > 0 && (<Button onClick={() => dispatch(addtoCart({ id: product.id, price: product.price, name: product.name, image: product.image, quantity: productQuantity }))} style={{ backgroundColor: iretroBrown }} className="mt-3">
              Add to Cart
            </Button>
            )}
          </div>
        ))}
      </div> */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product, index) => (
          <div key={index} className="col">
            <div className="card h-100">
              <img src={SERVER + product.image} className="card-img-top" style={{ objectFit: "cover" }} alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><small className="text-muted">ID: {product.id}</small></p>
                <p className="card-text"><small className="text-muted">Price: {product.price}</small></p>
                <p className="card-text"><small className="text-muted">Quantity In Stock: {product.quantity}</small></p>
                <Form.Control as="select" onChange={(e) => setProductQuantity(+e.target.value)} value={productQuantity}>
                {[...Array(product.quantity)].map((amount, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </Form.Control>

              </div>
              <div className="card-footer">
                {product.quantity > 0 ? (
                  <div>
                    <Button onClick={() => dispatch(addtoCart({ id: product.id, price: product.price, name: product.name, image: product.image, quantity: productQuantity }))} style={{ backgroundColor: iretroBrown }} className="mt-3">
                      Add to Cart
                    </Button>
                  </div>
                ) : (
                  <Button className="disabled mt-3" style={{ backgroundColor: iretroBrown, opacity: "50%" }}>
                    Out Of Stock
                  </Button>
                )}
                <Link to={`/product/info/${product.id}/`}>
                  <Button style={{ backgroundColor: iretroBrown }} className="mt-3">
                    Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <br />
        <br />
        <BasicPagination />
      </div>
    </div>
  );
}
