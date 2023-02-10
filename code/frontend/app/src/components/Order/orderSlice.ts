import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Cart from "../../models/Cart"
import { orderData } from "../../models/Order"
import { createOrder } from "./orderAPI"

export interface OrderState {
    order: []
    address: string
    city: string
    zip_code: string
    country: string
}

const initialState: OrderState = {
    order: [],
    address: "",
    city: "",
    zip_code: "",
    country: ""
}

export const newOrderAsync = createAsyncThunk(
    "order/newOrder",
    async (data: { orderData: orderData, orderDetails: Cart[] }) => {
        const response = await createOrder(data.orderData, data.orderDetails);
        return response.data;
    });

    export const orderSlice = createSlice({
        name: 'order', 
        initialState, 
        reducers: {}, 
        extraReducers: (builder) => {
            builder.addCase(newOrderAsync.fulfilled, (state, action) => {
                state.order = action.payload
            })
        }
    })

export const { } = orderSlice.actions; 
export default orderSlice.reducer;