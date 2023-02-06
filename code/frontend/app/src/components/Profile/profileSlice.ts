    import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
    import { RootState } from "../../app/store";
    import Profile from "../../models/Profile";
    import { getUserProfile, updateUserProfile } from "./profileAPI";


    export interface ProfileState {
        status: 'idle' | 'loading' | 'failed';
        first_name: string
        last_name: string
        email: string
        admin: boolean
        username: string
        image: string
    }

    const initialState: ProfileState = {
        status: 'idle',
        first_name: '',
        last_name: '',
        email: '',
        admin: false,
        username: '', 
        image: ''
    };

    export const getUserProfileAsync = createAsyncThunk(
        'profile/getUserProfile',
        async () => {
            const response = await getUserProfile();
            return response
        }
    )

    export const updateUserProfileAsync = createAsyncThunk(
        'profile/updateUserProfile', 
        async (profileData: Profile) => {
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
                console.log(action.payload.data)
                state.first_name = action.payload.data.first_name
                state.last_name = action.payload.data.last_name
                state.email = action.payload.data.email
                state.username = action.payload.data.username
                state.admin = action.payload.data.admin
                state.image = action.payload.data.image
            })
        }
    })

    export const { } = profileSlice.actions; 
    export default profileSlice.reducer;