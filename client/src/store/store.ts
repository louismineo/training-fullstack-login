// aka store.ts

import { configureStore } from "@reduxjs/toolkit";

import thunk from 'redux-thunk'

import employeesSlice from './employeesSlice'
import uiSlice from "./uiSlice";
const store = configureStore(
    {
        reducer:
        {
            employees:employeesSlice.reducer,
            ui:uiSlice.reducer
        },
        middleware: (getDefaultMiddleware)=>
            getDefaultMiddleware()//
    }
)

export default store;


// get the type of our store variable
export type AppStore = typeof store;
// infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type :  {employees: EmployeesState, ui: UiState}
export type AppDispatch = AppStore['dispatch']