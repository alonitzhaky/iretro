import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { loginUser, logoutUser } from './authenticationAPI';
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import { SERVER } from '../../env';
import axios from 'axios';
interface AuthenticationState {
  token: string
  isLogged: Boolean
  username: string
  is_staff: Boolean
  first_name: string
  last_name: string
}

export const initialState: AuthenticationState = {
  token: "",
  isLogged: false,
  username: "",
  is_staff: false,
  first_name: "",
  last_name: ""
}

export const registerUserAsync = createAsyncThunk(
  'authentication/registerUser',
  async (info:
    { username: string, password: string, email: string, first_name: string, last_name: string }, thunkApi) => {
    try {
      const response = await axios.post(SERVER + '/register/', { username: info.username, password: info.password, email: info.email, first_name: info.first_name, last_name: info.last_name });
      return response.data;
    } catch (error: any) {
      console.log(error.response.data)
      return thunkApi.rejectWithValue(error.response.data.error)
    }
  });
export const loginUserAsync = createAsyncThunk(
  'authentication/loginUser',
  async (details: any) => {
    const response = await loginUser(details);
    return response;
  });
export const logoutUserAsync = createAsyncThunk(
  'authentication/logoutUser',
  async () => {
    const response = await logoutUser();
    return response;
  }
)
export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    // Checks for LocalStorage information during every refresh. 
    // ⤵ loggedCheck - checks if there is an existing token, for data presentation.
    loggedCheck: (state) => {
      if (localStorage.getItem("token")) {
        state.isLogged = true
      }
    },
    // ⤵ staffCheck - checks for privileges of Staff / Administrator.
    staffCheck: (state) => {
      if (localStorage.getItem("is_staff") === "true") {
        state.is_staff = true
      }
    },
    tokenCheck: (state) => {
      if (localStorage.getItem("token")) {
        state.token = JSON.parse(String(localStorage.getItem("token")))
      }
    }


  },
  extraReducers: (builder) => {
    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      toast.success(`Successfully registered. Welcome!`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(function () {
        window.location.replace("/")
      }, 2000)
      state.isLogged = true
    }).addCase(registerUserAsync.rejected, (state, action) => {
      toast.error(`${action.payload}`, {
        position: toast.POSITION.TOP_CENTER
      })
    }).addCase(loginUserAsync.fulfilled, (state, action) => {
      interface JwtPayload {
        exp: number;
        iat: number;
        jti: string;
        token_type: string;
        user_id: number;
        username: string;
        is_staff: boolean;
      }
      const decoded = jwt_decode(action.payload.data.access) as JwtPayload;
      state.token = action.payload.data['access']
      state.username = decoded.username;
      state.is_staff = decoded.is_staff;
      localStorage.setItem("token", JSON.stringify(state.token))
      localStorage.setItem("username", JSON.stringify(state.username));
      localStorage.setItem("is_staff", JSON.stringify(state.is_staff));
      setTimeout(function () {
        window.location.replace("/")
      }, 2000)
      state.isLogged = true;
    }).addCase(logoutUserAsync.fulfilled, (state, action) => {
      localStorage.clear()
      setTimeout(function () {
        window.location.replace("/");
      }, 1000);
      state.isLogged = false;
    });
  },
});

export const { loggedCheck, staffCheck, tokenCheck } = authenticationSlice.actions;
export const selectIsLogged = (state: RootState) => state.authentication.isLogged;
export const selectToken = (state: RootState) => state.authentication.token
export const selectUser = (state: RootState) => state.authentication.username
export const selectStaff = (state: RootState) => state.authentication.is_staff
export default authenticationSlice.reducer;
