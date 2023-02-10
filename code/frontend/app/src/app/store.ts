import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authenticationSlice from '../components/Authentication/authenticationSlice';
import cartSlice from '../components/Cart/cartSlice';
import orderSlice from '../components/Order/orderSlice';
import productReducer from '../components/Products/productSlice'
import profileSlice from '../components/Profile/profileSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    authentication: authenticationSlice,
    cart: cartSlice,
    profile: profileSlice, 
    order: orderSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
