import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectIsLogged } from '../Authentication/authenticationSlice'
import { getAllReviewsPerProductAsync, selectReviewDescription } from './reviewSlice'

const Reviews = () => {
    const iretroBrown = "rgb(62,56,54)";
    let logged = useAppSelector(selectIsLogged) // Change to if bought, not if logged in.
    let { id } = useParams()
    let dispatch = useAppDispatch()
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState("")
    const reviewInfo = useAppSelector(selectReviewDescription)

    useEffect(() => {
        dispatch(getAllReviewsPerProductAsync(Number(id)))
    }, [])

    return (
        <div className='text-center'>
            <hr />
            {/* <th colSpan={2} style={{ color: iretroBrown }}>Reviews</th> */}
            <h1 style={{ color: iretroBrown }}>Reviews</h1>
            {reviewInfo.map((review, index) =>
                <div key={index}>
                    <p>Name: {review.customer_name}</p>
                    Review: {review.description}
                </div>
            )}
            <hr/>
            <h2>New Review:</h2>
            <input onChange={(e) => setDescription(e.target.value)} value={description} />
            
        </div>
    )
}

export default Reviews