import repositoriesReducer from './../app/pages/SearchRepository/repositoriesSlice';
import { ThunkAction } from '@reduxjs/toolkit';
import { Action } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  repositories: repositoriesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;