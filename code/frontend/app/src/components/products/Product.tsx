import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { SERVER } from "../../env";
import {
  selectProducts,
  getAllProductsAsync,
} from "./productSlice";


export function Product() {
  const iretroBrown = "rgb(62,56,54)"
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, []);
  return (
    <div className='text-center'>
      <h1 style={{color: iretroBrown}}>Products</h1>
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
          <img src = {SERVER + product.image} style={{height:"200px", width:"200px"}}/>
        </div>
      ))}
    </div>
  );
}
