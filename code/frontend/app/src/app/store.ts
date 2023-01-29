import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authenticationSlice from '../components/Authentication/authenticationSlice';
import productReducer from '../components/Products/productSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    authentication: authenticationSlice,
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
