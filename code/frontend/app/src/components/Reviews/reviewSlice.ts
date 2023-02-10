import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import Review from "../../models/Review";
import { getAllReviewsPerProduct } from "./reviewAPI";

export interface ReviewState {
    status: 'idle' | 'loading' | 'failed';
    review: Review[]
    amountReviews: number
    rating: number
}

const initialState: ReviewState = {
    status: 'idle', 
    review: [], 
    amountReviews: 0, 
    rating: 0
}

export const getAllReviewsPerProductAsync = createAsyncThunk(
    'review/getAllReviewsPerProduct', 
    async (id: number) => {
        const response = await getAllReviewsPerProduct(id);
        return response.data;
    }
)

export const ReviewSlice = createSlice({
    name: "review", 
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
        builder.addCase(getAllReviewsPerProductAsync.fulfilled, (state, action) => {
            state.review = action.payload
        })
    }
})

export const {} = ReviewSlice.actions;
export const selectReviewDescription = (state: RootState) => state.review.review
export default ReviewSlice.reducer;