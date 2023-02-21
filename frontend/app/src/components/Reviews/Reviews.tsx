import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectIsLogged } from '../Authentication/authenticationSlice'
import { getAllReviewsPerProductAsync, selectAllowedToReview, selectIsLoadingReview, selectReviewDescription, sendReviewAsync, sendReviewIfPurchasedAsync } from './reviewSlice'
import Rating from '@mui/material/Rating';
import { webColor } from '../../env'
import Spinner from '../Design/Spinner'

const Reviews = () => {
    let logged = useAppSelector(selectIsLogged)
    const isLoading = useAppSelector(selectIsLoadingReview)
    const { id } = useParams()
    let dispatch = useAppDispatch()
    const productList = useAppSelector(selectAllowedToReview)

    const ratingStars = useAppSelector((state) => state.review.rating);


    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState("")
    const reviewInfo = useAppSelector(selectReviewDescription)
    const [reviewButton, setReviewButton] = useState(false)
    const [hasCheckedForPurchasedProducts, setHasCheckedForPurchasedProducts] = useState(false);

    useEffect(() => {
        dispatch(getAllReviewsPerProductAsync(Number(id)))
    }, [id])

    useEffect(() => {
        if (logged && !hasCheckedForPurchasedProducts) {
            dispatch(sendReviewIfPurchasedAsync());
            setHasCheckedForPurchasedProducts(true);
        }
    }, [logged, hasCheckedForPurchasedProducts])

    useEffect(() => {
        if (productList.includes(Number(id))) {
            setReviewButton(true)
        }
    }, [productList, id])

    if (isLoading) return <Spinner clx='d-flex justify-content-center' />

    return (
        <div className='text-center'>
            <div className="d-flex justify-content-center align-items-center">
                {[...Array(5)].map((_, i) => {
                    const ratingValue = i + 1;
                    return (
                        <span key={i}>
                            <i style={{ color: webColor }} className={ratingStars >= ratingValue ? "fas fa-star" : rating >= ratingValue - 0.5 ? "fas fa-star-half-alt" : "far fa-star"}
                            ></i>
                        </span>
                    );
                })}
                <span>{"‏‏‎ ‎"}{ratingStars && ratingStars} / 5</span>
            </div>

            <hr />
            <h2 style={{ color: "black" }}>Customer Reviews</h2>
            <div className="reviews-container">
                <div className="review-list">
                    {reviewInfo.map((review, index) => (
                        <div key={index} className="review-item">
                            <div className="review-header">
                                <span className="reviewer-name">{review.customer_name}</span>
                            </div>
                            <div style={{ color: webColor }} className="review-rating">
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
                    defaultValue={2}
                    precision={1}
                    onChange={(e) => setRating(+((e.target as HTMLInputElement).value))} />
            </div>
            <br />
            Leave A Description: <Form.Control onChange={(e) => setDescription(e.target.value)} value={description} />
            {reviewButton
                ? <Button style={{ backgroundColor: webColor }} className="mt-3" onClick={() => { dispatch(sendReviewAsync({ rating, description, id })); window.location.reload() }}>
                    Send
                </Button>
                :
                <div><hr /><p>You must log in and purchase the item to leave a review.</p></div>
            }
        </div >
    )
}

export default Reviews