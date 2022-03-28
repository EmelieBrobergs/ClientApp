import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import userReducer from '../reduxSlices/userSlice';
import styleReducer from '../reduxSlices/styleSlice';

const store = configureStore({
    //devTools: true, // enable the Redux DevTools Extension. Från https://www.bezkoder.com/react-redux-login-example-toolkit-hooks/
    reducer: {
        user: userReducer,
        style: styleReducer
    }
})

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;

export default store

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;