import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getUserProfile } from "./profileAPI";
import Profile from "../../models/Profile";

export interface ProfileState {
    status: 'idle' | 'loading' | 'failed';
    first_name: string
    last_name: string
    email: string
    admin: boolean
    username: string
}

const initialState: ProfileState = {
    status: 'idle',
    first_name: '',
    last_name: '',
    email: '',
    admin: false,
    username: '', 
};

export const getUserProfileAsync = createAsyncThunk(
    'profile/getUserProfile',
    async () => {
        const response = await getUserProfile();
        return response
    }
)

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserProfileAsync.fulfilled, (state, action) => {
            console.log(action.payload.data)
            state.first_name = action.payload.data.first_name
            state.last_name = action.payload.data.last_name
            state.email = action.payload.data.email
            state.username = action.payload.data.username
            state.admin = action.payload.data.admin
        })
    }
})

export const { } = profileSlice.actions; 
export default profileSlice.reducer;