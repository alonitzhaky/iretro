import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import Profile from "../../models/Profile";
import { getUserOrders, getUserProfile, updateUserProfile } from "./profileAPI";

export interface ProfileState {
    status: 'idle' | 'loading' | 'failed';
    first_name: string
    last_name: string
    email: string
    admin: boolean
    username: string
    image: string,
    address: string,
    phone_number: string,
    order: Order[]
    order_details: OrderDetail[]
}

export interface Order {
    id: number;
    order_date: string;
    address: string;
    city: string;
    country: string;
    zip_code: string;
    total: string;
    user: number;
}
interface OrderDetail {
    id: number;
    product_name: string;
    quantity: number;
    total: string;
    order: number;
    product: number;
}

const initialState: ProfileState = {
    status: 'idle',
    first_name: '',
    last_name: '',
    email: '',
    admin: false,
    username: '',
    image: '',
    address: '',
    phone_number: '',
    order: [],
    order_details: []
};

export const getUserOrdersAsync = createAsyncThunk(
    'profile/getUserOrders',
    async () => {
        const response = await getUserOrders();
        console.log(response.data)
        return response.data
    }
)

export const getUserProfileAsync = createAsyncThunk(
    'profile/getUserProfile',
    async () => {
        const response = await getUserProfile();
        console.log(response.data)
        return response.data
    }
)

export const updateUserProfileAsync = createAsyncThunk(
    'profile/updateUserProfile',
    async (profileData: any) => {
        const response = await updateUserProfile(profileData);
        return response;
    }
)

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserProfileAsync.fulfilled, (state, action) => {
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.email = action.payload.email
            state.username = action.payload.username
            state.admin = action.payload.admin
            state.image = action.payload.image
            state.address = action.payload.address
            state.phone_number = action.payload.phone_number
        }).addCase(getUserOrdersAsync.fulfilled, (state, action) => {
            state.order = action.payload.orders
            state.order_details = action.payload.order_details
        })
    }
})

export const { } = profileSlice.actions;
export default profileSlice.reducer;