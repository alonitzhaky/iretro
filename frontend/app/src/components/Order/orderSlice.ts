import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState, store } from "../../app/store"
import Cart from "../../models/Cart"
import { createOrder } from "./orderAPI"

export interface OrderState {
    address: string
    city: string
    zip_code: string
    country: string
}

const initialState: OrderState = {
    address: "",
    city: "",
    zip_code: "",
    country: ""
}

export const newOrderAsync = createAsyncThunk(
    'order/newOrder',
    async (data: { orderDetails: Cart[] }) => {
        const total = data.orderDetails.reduce((accumulate, item) => accumulate + item.price * item.quantity, 0)
        const quantity = data.orderDetails.reduce((accumulate, item) => accumulate + item.quantity, 0)
        const orderDataWithTotalAndQuantity = {...store.getState().order, 
        total, quantity}
        const response = await createOrder(orderDataWithTotalAndQuantity, data.orderDetails)
        return response.data;
    }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        newAddress: (state, action) => {
            state.address = action.payload;
        },
        newCity: (state, action) => {
            state.city = action.payload;
        },
        newCountry: (state, action) => {
            state.country = action.payload;
        },
        newZipCode: (state, action) => {
            state.zip_code = action.payload;
        },

    },
    extraReducers: () => {}
})

export const { newAddress, newCity, newCountry, newZipCode } = orderSlice.actions;
export const selectNewAddress = (state: RootState) => state.order.address
export const selectNewCity = (state: RootState) => state.order.city
export const selectNewCountry = (state: RootState) => state.order.country
export const selectNewZipCode = (state: RootState) => state.order.zip_code
export default orderSlice.reducer;