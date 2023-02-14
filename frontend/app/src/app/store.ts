import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authenticationSlice from '../components/Authentication/authenticationSlice';
import cartSlice from '../components/Cart/cartSlice';
import orderSlice from '../components/Order/orderSlice';
import productSlice from '../components/Products/productSlice';
import profileSlice from '../components/Profile/profileSlice';
import reviewSlice from '../components/Reviews/reviewSlice';

export const store = configureStore({
  reducer: {
    product: productSlice,
    authentication: authenticationSlice,
    cart: cartSlice,
    profile: profileSlice, 
    order: orderSlice, 
    review: reviewSlice
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
