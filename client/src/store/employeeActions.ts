
import { employeesActions } from "./employeesSlice";
import { uiActions } from "./uiSlice";
import axios from "axios";

export const createEmployeeData = (empName:string, empSalary:number, empDepartment:string) =>
{
    return async (dispatch:any) =>
        {
            const createEmployeeInDB = async(empName:string, empSalary:number, empDepartment:string ) =>
            {

                const employeeData = 
                {
                    "name" : empName,
                    "salary": empSalary,
                    "department": empDepartment
                }

                const response = await axios.post('http://localhost:1337/employee', employeeData
                )
    
                if(response.status !== 200)
                    throw Error(response.data);  
            }
    
            try
            {
                await createEmployeeInDB(empName, empSalary, empDepartment);
                //refresh after deletion
                readEmployeeData();
    
            }
            catch(e:any)
            {
                alert(e.message);
            }
        }
}


export const readEmployeeData = () => // returns array, not object
{
    return async (dispatch:any) =>
    {
        const fetchAllEmployeesFromDB = async() =>
        {
            const response = await axios.get('http://localhost:1337/employee')

            if(response.status !== 200)
                throw Error(response.data);

            //converting to json might take a while if too large
            return response.data['employees'];   
        }

        try
        {
            const employeeData = await fetchAllEmployeesFromDB();
            dispatch(employeesActions.refreshData(employeeData));
            dispatch(uiActions.updatePage(employeeData.length));

        }
        catch(e:any)
        {
            alert(e.message);
        }
    }
}

export const updateEmployeeData = (empUUID:string, empName:string, empSalary:number, empDepartment:string ) =>
{
    return async (dispatch:any) =>
        {
            const updateEmployeeInDB = async(empUUID:string, empName:string, empSalary:number, empDepartment:string ) =>
            {

                const employeeData = 
                {
                    "name" : empName,
                    "salary": empSalary,
                    "department": empDepartment
                }

                const response = await axios.put('http://localhost:1337/employee/'+empUUID, employeeData
                )
    
                if(response.status !== 200)
                    throw Error(response.data);  
            }
    
            try
            {
                await updateEmployeeInDB(empUUID, empName, empSalary, empDepartment);
                //refresh after deletion
                dispatch(readEmployeeData());
    
            }
            catch(e:any)
            {
                //console.log(e);
                alert(e.message +": "+ e.response.request.statusText);
            }
        }
}

export const deleteEmployeeData = (empUUID:string) =>
{
    return async (dispatch:any) =>
        {
            const deleteEmployeeFromDB = async(empUUID:string) =>
            {
                const response = await axios.delete('http://localhost:1337/employee/'+empUUID)
    
                if(response.status !== 204)
                    throw Error(response.data);  
            }
    
            try
            {
                await deleteEmployeeFromDB(empUUID);
                //refresh after deletion
                dispatch(readEmployeeData());
    
            }
            catch(e:any)
            {
                alert(e.message);
            }
        }
}