
import { EmployeeCard } from "./employeeCard"
import { Employee } from "../store/employeesSlice"

import { useAppSelector } from '../store/hooks'
import { useEffect } from "react"


export const EmployeesGrid = () =>
{
    const isDesktop:boolean = useAppSelector((state)=>state.ui.isDesktop)

    /*
    const componentStyle = {
        display:"Grid" ,
        height : isDesktop ? '85%' : 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        gridTemplateColumns: `repeat(${isDesktop ? 2 : 1}, 1fr)`,
        gridTemplateRows: `repeat(${isDesktop ? 5 : 10}, 1fr)`,
        gap: '0%'
    }
    */

    

    const employeesArray:Employee[] = useAppSelector((state)=>state.employees.employees);

    useEffect(()=>
    {

    },[employeesArray])

    const pageNumber = useAppSelector((state)=>state.ui.curentPageNumber);
    const cardsPerPage = useAppSelector((state)=>state.ui.maxRecords);



    // get subset of employees to display
    function getPaginatedData<T>(array: T[], page: number, pageSize: number = 10): T[] 
    {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return array.slice(startIndex, endIndex);
    }


    const currentTenEmployees = getPaginatedData(employeesArray, pageNumber, cardsPerPage);
    //console.log(current10Employees)

    




    return(
        <div style = {{
            display:"Grid" ,
            height : isDesktop ?'85%' : 'auto',
            justifyItems:'center',
            alignItems: 'center',
            gridTemplateColumns: `repeat(${isDesktop ? 2 : 1}, 1fr)`,
            gridTemplateRows: `repeat(${isDesktop ? 5 : (currentTenEmployees.length >= 10 ? 10: currentTenEmployees.length )}, 1fr)`,
            gap: '0%'
        }}>
            {currentTenEmployees.map((emp,index) =>
                {
                    return(
                        <EmployeeCard key = {index} emp={emp}/>
                    )
                })}
        </div>
    )
}