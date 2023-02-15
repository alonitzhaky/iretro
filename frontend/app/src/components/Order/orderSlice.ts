import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Cart from "../../models/Cart"
import Order from "../../models/Order"
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
    'order/newOrder',
    async (data: { orderData: Order, orderDetails: Cart[] }) => {
        const total = data.orderDetails.reduce((accumulate, item) => accumulate + item.price * item.quantity, 0)
        const quantity = data.orderDetails.reduce((accumulate, item) => accumulate + item.quantity, 0)
        const orderDataWithTotalAndQuantity = { ...data.orderData, total, quantity }
        const response = await createOrder(orderDataWithTotalAndQuantity, data.orderDetails)
        return response.data;
    }
)

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