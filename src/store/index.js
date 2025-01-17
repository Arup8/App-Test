import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import languageReducer from './slices/languageSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    language: languageReducer,
  },
});

export default store;