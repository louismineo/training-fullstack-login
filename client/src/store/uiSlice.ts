import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

export enum userStates
{
    isView,
    isAdd,
    isEdit,
}


//defining a type for the slice state
interface UiState
{
    isDesktop:          boolean,
    isWidescreen:       boolean,
    maxRecords:         number,
    curentPageNumber:   number,
    minPageNumber:      number, // affected by employee count
    maxPageNumber:      number  // affected by employee count and self's maxRecords
    currentUserState:   userStates
}


//init the state using that type
const initialState : UiState =
{
    isDesktop: true,
    isWidescreen : false,
    maxRecords:10,
    curentPageNumber: 1,
    minPageNumber:1,
    maxPageNumber: 1,
    currentUserState : userStates.isView

}


const uiSlice = createSlice(
    {
        name:'ui',
        initialState,  // `createSlice` will infer the state type from the `initialState` argument
        reducers:
        {
            updateIsDesktop(state,action : PayloadAction<boolean>)
            {
                state.isDesktop = action.payload
            },
            updateIsWidescreen(state,action : PayloadAction<boolean>)
            {
                state.isWidescreen = action.payload
            },
            updateUserState(state,action : PayloadAction<userStates>)
            {
                state.currentUserState = action.payload
            },
            updatePage(state,action : PayloadAction<number>) // Use the PayloadAction type to declare the contents of `action.payload`
            {
                //change max page number here
                if((action.payload % state.maxRecords) === 0) 
                {
                    // the change page
                    state.maxPageNumber = Math.floor(action.payload / state.maxRecords);
                    if(state.curentPageNumber  > state.maxPageNumber )
                    {
                        state.curentPageNumber = state.maxPageNumber
                    }
                }
                else
                {
                    state.maxPageNumber = Math.floor(action.payload / state.maxRecords) + 1;
                }
            },
            nextPage(state)
            {
                if((state.curentPageNumber+1) <= state.maxPageNumber)
                    state.curentPageNumber++;
            },
            previousPage(state)
            {
                if((state.curentPageNumber-1) >= state.minPageNumber)
                    state.curentPageNumber--;
            },          
        }
    }
)

export default uiSlice;

export const uiActions = uiSlice.actions;