import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Reviews from '../Reviews/Reviews'
import { getOneProductAsync } from './productSlice'

const SingleProduct = () => {
  const rating = useAppSelector((state) => state.review.rating)
  const { product } = useAppSelector((state) => state.product)
  console.log(product)
  const iretroBrown = "rgb(62,56,54)";
  let { id } = useParams()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getOneProductAsync(Number(id)))

  }, [])

  return (
    <div className='text-center'>
      <h1 style={{ color: iretroBrown }}>More Info</h1>
      <hr />
      {/* {rating} */}
      <samp>
        <i className={rating >= 1 ? 'fas fa-star' : rating >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'} style={{ color: iretroBrown }}> </i>
      </samp>
      {/* Check if rating bigger 2 so i get a star or helf star  */}
      <samp>
        <i className={rating >= 2 ? 'fas fa-star' : rating >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'} style={{ color: iretroBrown }}> </i>
      </samp>
      {/* Check if rating bigger 3 so i get a star or helf star  */}
      <samp>
        <i className={rating >= 3 ? 'fas fa-star' : rating >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'} style={{ color: iretroBrown }}> </i>
      </samp>
      {/* Check if rating bigger 4 so i get a star or helf star  */}
      <samp>
        <i className={rating >= 4 ? 'fas fa-star' : rating >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'} style={{ color: iretroBrown }}> </i>
      </samp>
      {/* Check if rating bigger 5 so i get a star or helf star  */}
      <samp>
        <i className={rating >= 5 ? 'fas fa-star' : rating >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'} style={{ color: iretroBrown }}> </i>
      </samp>
      <span> {" "}
        {rating && rating} / 5
      </span>
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{product.id}</p>
      <Reviews />
    </div>
  )
}

export default SingleProduct