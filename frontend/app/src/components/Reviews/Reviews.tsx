import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectIsLogged } from '../Authentication/authenticationSlice'
import { getAllReviewsPerProductAsync, selectAllowedToReview, selectReviewDescription, sendReviewAsync, sendReviewIfPurchasedAsync } from './reviewSlice'
import Rating from '@mui/material/Rating';

const Reviews = () => {
    const iretroBrown = "rgb(62,56,54)";
    let logged = useAppSelector(selectIsLogged) // Change to if bought, not if logged in.
    let { id } = useParams()
    let dispatch = useAppDispatch()
    const productList = useAppSelector(selectAllowedToReview)
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState("")
    const reviewInfo = useAppSelector(selectReviewDescription)
    const [reviewButton, setReviewButton] = useState(false)
    const [hasCheckedForPurchasedProducts, setHasCheckedForPurchasedProducts] = useState(false);

    useEffect(() => {
        dispatch(getAllReviewsPerProductAsync(Number(id)))
        if (logged && !hasCheckedForPurchasedProducts) {
            dispatch(sendReviewIfPurchasedAsync());
            setHasCheckedForPurchasedProducts(true);
        }
    }, [dispatch, id, logged, hasCheckedForPurchasedProducts])
    
    useEffect(() => {
        if (productList.includes(Number(id))) {
            setReviewButton(true)
        }
    }, [productList, id])

    return (
        <div className='text-center'>
            <hr />
            {/* <th colSpan={2} style={{ color: iretroBrown }}>Reviews</th> */}
            <h1 style={{ color: iretroBrown }}>Reviews</h1>
            {reviewInfo.map((review, index) =>
                <div key={index}>
                    <p>Name: {review.customer_name}</p>
                    <p>Review: {review.description}</p>
                    <hr />
                </div>
            )}
            <h3>New Review:</h3>
            <div>
                <p>Rate This Product: </p>
                <Rating
                    value={rating}
                    style={{ color: iretroBrown }}
                    name="half-rating"
                    defaultValue={2.5}
                    precision={0.5}
                    onChange={(e) => setRating(+((e.target as HTMLInputElement).value))} />
            </div>
            <br />
            Leave A Description: <Form.Control onChange={(e) => setDescription(e.target.value)} value={description} />
            {reviewButton &&
                <Button onClick={() => { dispatch(sendReviewAsync({ rating, description, id })); window.location.reload() }}>
                    Send
                </Button>}
        </div >
    )
}

export default Reviews