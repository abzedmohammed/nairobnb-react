import { configureStore } from '@reduxjs/toolkit';
import bnbReducer from '../features/bnbs/bnbSlice';
import userReducer from '../features/user/userSlice'

export const store = configureStore({
	reducer: {
		bnbs: bnbReducer,
		user: userReducer
	},
});
