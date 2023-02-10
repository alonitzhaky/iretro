import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getOneProductAsync } from './productSlice'

const SingleProduct = () => {
    const {product} = useAppSelector((state) => state.product)
    console.log(product)
    const iretroBrown = "rgb(62,56,54)";
    let {id} = useParams()
    const dispatch = useAppDispatch()
    useEffect(() => {
      dispatch(getOneProductAsync(Number(id)))
    
    }, [])
    
  return (
    <div className='text-center'>
        <h1 style={{color: iretroBrown}}>More Info</h1>
        <hr/>
        <p>{product.id}</p>
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <p>{product.id}</p>
        <p>{product.id}</p>
    </div>
  )
}

export default SingleProduct