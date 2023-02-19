import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectIsLogged } from '../Authentication/authenticationSlice'
import { getAllReviewsPerProductAsync, selectAllowedToReview, selectReviewDescription, sendReviewAsync, sendReviewIfPurchasedAsync } from './reviewSlice'
import Rating from '@mui/material/Rating';

const Reviews = () => {
    const webColor = "rgb(62,56,54)";
    let logged = useAppSelector(selectIsLogged)
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
            <h2 style={{ color: "black" }}>Customer Reviews</h2>
            <div className="reviews-container">
                <div className="review-list">
                    {reviewInfo.map((review, index) => (
                        <div key={index} className="review-item">
                            <div className="review-header">
                                <span className="reviewer-name">{review.customer_name}</span>
                            </div>
                            <div className="review-rating">
                                {[...Array(review.rating)].map((star, i) => (
                                    <i key={i} className="fas fa-star"></i>
                                ))}
                                {[...Array(5 - review.rating)].map((star, i) => (
                                    <i key={i} className="far fa-star"></i>
                                ))}
                            </div>
                            <div className="review-description">{review.description}</div>
                        </div>
                    ))}
                </div>
                <hr />
            </div>
            <h2>New Review:</h2>
            <div>
                <p>Rate This Product: </p>
                <Rating
                    value={rating}
                    style={{ color: webColor }}
                    name="half-rating"
                    defaultValue={2.5}
                    precision={1}
                    onChange={(e) => setRating(+((e.target as HTMLInputElement).value))} />
            </div>
            <br />
            Leave A Description: <Form.Control onChange={(e) => setDescription(e.target.value)} value={description} />
            {reviewButton
                ? <Button onClick={() => { dispatch(sendReviewAsync({ rating, description, id })); window.location.reload() }}>
                    Send
                </Button>
                :
                <div><hr /><p>You must log in and purchase the item to leave a review.</p></div>
            }
        </div >
    )
}

export default Reviews