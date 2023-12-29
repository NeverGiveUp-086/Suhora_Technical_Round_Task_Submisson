// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/reducer/userReducer';
import { useDispatch } from 'react-redux';
import productReducer from '../redux/reducer/productReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
