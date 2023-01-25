import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { SERVER } from "../../env";
import {
  selectProducts,
  getAllProductsAsync,
} from "./productSlice";

export function Product() {
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, []);
  return (
    <div>
      <br/>
      Products
      <br/>
      {products.length}
      {products.map((product, index) => (
        <div key={index}>
          <hr/>
          ID: {product.id}
          <br/>
          Name: {product.name}
          <br/>
          Price: {product.price}
          <br/>
          Description: {product.description}
          <br/>
          Image:
          <br/>
          <img src = {SERVER + product.image}/>
        </div>
      ))}
    </div>
  );
}
