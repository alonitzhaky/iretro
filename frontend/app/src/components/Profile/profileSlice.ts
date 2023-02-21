import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import Profile from "../../models/Profile";
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
    isLoading: Boolean
    profile?: Profile
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
    products: Array<{
        id: number;
        product_name: string;
        quantity: number;
        total: string;
        order: number;
        product: number;
    }>;

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
    order_details: [], 
    isLoading: true, 
    profile: undefined
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
        builder.addCase(getUserProfileAsync.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(getUserProfileAsync.fulfilled, (state, action) => {
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.email = action.payload.email
            state.username = action.payload.username
            state.admin = action.payload.admin
            state.image = action.payload.image
            state.address = action.payload.address
            state.phone_number = action.payload.phone_number
            state.isLoading = false
        }).addCase(getUserOrdersAsync.fulfilled, (state, action) => {
            state.order = action.payload.orders
            state.order_details = action.payload.order_details
        })
    }
})

export const { } = profileSlice.actions;
export const selectIsLoadingProfile = (state: RootState) => state.profile.isLoading
export default profileSlice.reducer;