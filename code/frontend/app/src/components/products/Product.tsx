import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { SERVER } from "../../env";
import { addtoCart } from "../Cart/cartSlice";
import {
  selectProducts,
  getAllProductsAsync,
} from "./productSlice";

export function Product() {
  const iretroBrown = "rgb(62,56,54)";
  const [productQuantity, setProductQuantity] = useState(1)
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, []);
  return (
    <div className="text-center">
      <h1 style={{ color: iretroBrown }}>Products</h1>
      <hr style={{ color: iretroBrown }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: "20px" }}>
        {products.map((product, index) => (
          <div key={index} style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <img src={SERVER + product.image} style={{ height: "150px", width: "100%", objectFit: "cover" }} alt={product.name} />
            <hr />
            <p>ID: {product.id}</p>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
            <p>Quantity In Stock: {product.quantity}</p>
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
            {product.quantity > 0 && (<Button onClick={() => dispatch(addtoCart({ id: product.id, price: product.price, name: product.name, image: product.image, quantity: productQuantity }))} style={{ backgroundColor: iretroBrown }} className="mt-3">
              Add to Cart
            </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
