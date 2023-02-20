import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import Review from "../../models/Review";
import { getAllReviewsPerProduct, sendReview, sendReviewIfPurchased } from "./reviewAPI";

export interface ReviewState {
    status: 'idle' | 'loading' | 'failed';
    review: Review[]
    amountReviews: number
    rating: number
    purchasedProducts: number[]
    isLoading: Boolean
}

const initialState: ReviewState = {
    status: 'idle', 
    review: [], 
    amountReviews: 0, 
    rating: 0, 
    purchasedProducts: [], 
    isLoading: true
}

export const getAllReviewsPerProductAsync = createAsyncThunk(
    'review/getAllReviewsPerProduct', 
    async (id: number) => {
        const response = await getAllReviewsPerProduct(id);
        return response.data;
    }
)

export const sendReviewIfPurchasedAsync = createAsyncThunk(
    'review/sendReviewIfPurchased', 
    async () => {
        const response = await sendReviewIfPurchased(); 
        return response.data;
    }
)

export const sendReviewAsync = createAsyncThunk(
    'review/sendReview', 
    async (details: any) => {
        const response = await sendReview(details);
        return response.data
    }
)

export const ReviewSlice = createSlice({
    name: "review", 
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
        builder.addCase(getAllReviewsPerProductAsync.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(getAllReviewsPerProductAsync.fulfilled, (state, action) => {
            state.review = action.payload
            state.amountReviews = state.review.length
            let total = 0
            // Returns average rating of all reviews
            for (let index = 0; index < state.review.length; index++) {
                total += state.review[index].rating;
                state.rating = Math.round(total / state.review.length)
            }
            state.isLoading = false
        }).addCase(sendReviewIfPurchasedAsync.fulfilled, (state, action) => {
            state.purchasedProducts = action.payload
        })
    }
})

export const {} = ReviewSlice.actions;
export const selectReviewDescription = (state: RootState) => state.review.review
export const selectAverageRating = (state: RootState) => state.review.rating
export const selectAllowedToReview = (state: RootState) => state.review.purchasedProducts
export const selectIsLoadingReview = (state: RootState) => state.review.isLoading
export default ReviewSlice.reducer;