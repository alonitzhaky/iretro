    import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
    import { RootState } from "../../app/store";
    // import Profile from "../../models/Profile";
    import { getUserProfile, updateUserProfile } from "./profileAPI";


    export interface ProfileState {
        status: 'idle' | 'loading' | 'failed';
        first_name: string
        last_name: string
        email: string
        admin: boolean
        username: string
        image: string, 
        address: string, 
        phone_number: string
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
        phone_number: ''
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
                state.first_name = action.payload.data.first_name
                state.last_name = action.payload.data.last_name
                state.email = action.payload.data.email
                state.username = action.payload.data.username
                state.admin = action.payload.data.admin
                state.image = action.payload.data.image
                state.address = action.payload.data.address
                state.phone_number = action.payload.data.phone_number
                console.log(action.payload)
            })
        }
    })

    export const { } = profileSlice.actions; 
    // ⤵ Ask Lidor if line below is relevant or RootState not needed in reducer.
    // export const selectProfile = (state: RootState) => state.profile.username
    export default profileSlice.reducer;