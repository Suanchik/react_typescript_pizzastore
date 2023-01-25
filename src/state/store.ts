import { configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction, combineReducers } from 'redux';
import pizzasState from "./reducers/pizzas";
import cartState from "./reducers/cart";

const reducers = combineReducers({
    pizzasState,
    cartState
});

export const store = configureStore({
    reducer: reducers
});

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;