import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { SERVER } from "../../env";
import { addtoCart } from "../Cart/cartSlice";
import BasicPagination from "../Design/BasicPagination";
import {
  selectProducts,
  getAllProductsInCategoryAsync,
} from "./productSlice";
import { webColor } from "../../env";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const navigate = useNavigate()
  let { id } = useParams()
  const [productQuantity, setProductQuantity] = useState(1)
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProductsInCategoryAsync({ page: 1, id: Number(id) }));
  }, [id]);
  return (
    <div className="text-center">
      {Number(id) === 1 &&
        <h1 style={{ color: webColor }}>DIY - Do It Yourself</h1>
      }
      {Number(id) === 2 &&
        <h1 style={{ color: webColor }}>Fully Built Kits</h1>
      }
      {Number(id) === 3 &&
        <h1 style={{ color: webColor }}>Spare Parts</h1>
      }
      <hr style={{ color: webColor }} />
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product, index) => (
          <div key={index} className="col">
            <div className="card h-100">
              <img src={SERVER + product.image} className="card-img-top" style={{ objectFit: "cover" }} alt={product.name} />
              <div className="card-body">
                <hr />
                <h5 className="card-title">{product.name}</h5>
                <hr />
                <p className="card-text-description">{product.description}</p>
                <hr />
                <h5 className="card-title"><small>Price: ${product.price}</small></h5>
                <hr />
                {product.quantity === 0 && <div>This product is out of stock. We will restock it soon.</div>}
                {product.quantity > 0 && (
                  <Form.Control className="quantity-selector" as="select" onChange={(e) => setProductQuantity(+e.target.value)} value={productQuantity}>
                    {[...Array(product.quantity)].map((amount, index) => (
                      <option key={index + 1} value={index + 1}>
                        Quantity Selected: {" "}
                        {index + 1}
                      </option>
                    ))}
                  </Form.Control>
                )}
              </div>
              <div className="card-footer d-flex justify-content-center">
                {product.quantity > 0 ? (
                  <Button onClick={() => dispatch(addtoCart({ id: product.id, price: product.price, name: product.name, image: product.image, quantity: productQuantity }))} style={{ backgroundColor: webColor, marginRight: "10px" }}>
                    Add to Cart
                  </Button>
                ) : (
                  <Button className="disabled" style={{ backgroundColor: webColor, marginRight: "10px" }}>
                    Not In Stock
                  </Button>
                )}
                <Button style={{ backgroundColor: webColor }} onClick={() => {
                  navigate(`/product/info/${product.id}/`);
                  window.scrollTo(0, 0);
                }}>
                  Details
                </Button>
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
    </div >
  );
}
