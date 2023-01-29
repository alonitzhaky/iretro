import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { loginUser, registerUser } from './authenticationAPI';

interface AuthenticationState {
  token: string
  isLogged: Boolean
  username: string
}

export const initialState: AuthenticationState = {
  token: "",
  isLogged: false,
  username: ""
}

export const registerUserAsync = createAsyncThunk(
  'authentication/registerUser',
  async (info:
    {username:string, password:string, email:string}) => {
    const response = await registerUser(info.username, info.password, info.email);
    return response.data;
  });

export const loginUserAsync = createAsyncThunk(
  'authentication/loginUser',
  async (details:any) => {
    const response = await loginUser(details);
    return response;
  });

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    getToken: (state) => 
    {if(localStorage.getItem("token") || "")
    {state.token = localStorage.getItem("token") || ""}}, 
    getUsername: (state) => 
    {if(localStorage.getItem("username") || "")
    {state.username = localStorage.getItem("username") || ""}}
  }, 
  extraReducers: (builder) => {
    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      state.isLogged = true
    }).addCase(loginUserAsync.fulfilled, (state, action) => {
      state.token = action.payload.data['refresh']
      state.username = action.payload.data['username']
      localStorage.setItem("token", JSON.stringify(state.token))
      localStorage.setItem("username", JSON.stringify(state.username))
      state.isLogged = true}
    )},
  })

export const {getToken} = authenticationSlice.actions;
export const selectIsLogged = (state: RootState) => state.authentication.isLogged;
export default authenticationSlice.reducer;