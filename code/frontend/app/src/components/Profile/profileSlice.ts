import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getUserProfile } from "./profileAPI";
import Profile from "../../models/Profile";

export interface ProfileState {
    status: 'idle' | 'loading' | 'failed';
    name: string
    email: string
    admin: boolean
    username: string
}

const initialState: ProfileState = {
    status: 'idle',
    name: '',
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
            state.name = action.payload.data.name
            state.email = action.payload.data.email
            state.username = action.payload.data.username
            state.admin = action.payload.data.admin
        })
    }
})

export const { } = profileSlice.actions; 
export default profileSlice.reducer;