import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import Cart from "../../models/Cart";

interface CartState {
    status: 'idle' | 'loading' | 'failed';
    cart: Cart[]
}

const initialState: CartState = {
    status: 'idle',
    cart: []
};

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        cartFix: (state) => {
            if(localStorage.getItem("acrt")){
                state.cart = JSON.parse(String(localStorage.getItem("cart")))
            }
        },
        addtoCart: (state, action) => {
            let correctCart = false;
            for (let index = 0; index < state.cart.length; index++) {
                if (state.cart[index].id === action.payload.id) {
                    state.cart[index] = action.payload
                    correctCart = true
                }
            }
            if (!correctCart) {
                state.cart.push(action.payload)
            }
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        removefromCart: (state, action) => {
            for (let index = 0; index < state.cart.length; index++) {
                if (state.cart[index].id === action.payload) {
                    state.cart.splice(index, 1)
                    localStorage.setItem("cart", JSON.stringify(state.cart))
                }
            }
        },
        addQuantity: (state, action) => {
            for (let index = 0; index < state.cart.length; index++) {
                if (state.cart[index].id === action.payload) {
                    state.cart[index].quantity += 1
                    localStorage.setItem("cart", JSON.stringify(state.cart))
                }
            }
        },
        removeQuantity: (state, action) => {
            for (let index = 0; index < state.cart.length; index++) {
                if (state.cart[index].id === action.payload) {
                    state.cart[index].quantity -= 1
                    if (state.cart[index].quantity === 0) {
                        state.cart.splice(index, 1)
                    }
                    localStorage.setItem("cart", JSON.stringify(state.cart))
                }
            }   
        }
    }
})

export const { addtoCart, removefromCart, addQuantity, removeQuantity, cartFix } = CartSlice.actions;
export const selectCart = (state: RootState) => state.cart.cart;
export default CartSlice.reducer;