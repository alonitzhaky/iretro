import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
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
    orders: Order[]
}

interface Order {
    order_number: string;
    product_name: string;
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
    orders: []
};

export const getUserOrdersAsync = createAsyncThunk(
    'profile/getUserOrders',
    async () => {
        const response = await getUserOrders();
        return response.data
    }
)

export const getUserProfileAsync = createAsyncThunk(
    'profile/getUserProfile',
    async () => {
        const response = await getUserProfile();
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
            state.orders = action.payload
            console.log(state.orders)
        })
    }
})

export const { } = profileSlice.actions;
// export const selectProfile = (state: RootState) => state.profile.username
export default profileSlice.reducer;