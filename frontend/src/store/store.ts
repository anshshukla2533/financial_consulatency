import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import itrReducer from './slices/itrSlice';
import caReducer from './slices/caSlice';
import chatReducer from './slices/chatSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    itr: itrReducer,
    ca: caReducer,
    chat: chatReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;