import { createSlice} from "@reduxjs/toolkit";

export interface Employee
{
    uuid:string,
    name:string,
    salary:number,
    department:string
}


interface EmployeesState
{
    employees:Employee[],
    employeesCount:number 
}

const initialState :EmployeesState = 
{
    employees : [],
    employeesCount:0
}

const employeesSlice = createSlice(
    {
        name:'employees',
        initialState,
        reducers:
        {
            refreshData(state,action)
            {
                state.employees = action.payload;
                state.employeesCount = state.employees.length;
            },
            addEmployee(state,action)
            {

            },
            removeEmployee(state,action)
            {

            }
        }
    }
)

export default employeesSlice;
export const employeesActions = employeesSlice.actions;