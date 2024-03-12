// Redux/slices/index.ts

import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here if any
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
