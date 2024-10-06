import axios from "axios"
import { uiActions } from "./uiSlice"


type deptMapping =
{
    deptId:number,
    name:string
}

export const getDeptIdFromString=(deptString:string)=>
{
    
}

export const readDepartmentData = () => // returns array, not object
{
    return async (dispatch:any) =>
    {
        const fetchAllDepartmentsFromDB = async() =>
        {
            const response = await axios.get('http://localhost:1337/departments')

            if(response.status !== 200)
                throw Error(response.data);

            //converting to json might take a while if too large
            return response.data;   
        }

        try
        {
            const departmentsData = await fetchAllDepartmentsFromDB();

            dispatch(uiActions.updateDepartmentsMap(departmentsData));
        }
        catch(e:any)
        {
            alert(e.message);
        }
    }
}