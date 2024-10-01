import { Header } from './header'
import { EmployeesGrid } from './employeesGrid'
import { Footer } from './footer'


import { uiActions,userStates } from '../store/uiSlice'
import { useEffect } from "react"
import { useAppDispatch } from '../store/hooks'
import { readEmployeeData } from '../store/employeeActions'
import { useNavigate } from 'react-router-dom';


export const MainPage = () =>
{

    const navigate = useNavigate();

    // get the dispatch
    const dispatch = useAppDispatch();
    useEffect(()=>
    {
        console.log('Dispatching action ... readEmployeeData');
        dispatch(readEmployeeData())
    },[dispatch])

    const GoToAdd = () =>{
        dispatch(uiActions.updateUserState(userStates.isAdd))
        navigate(`/addEdit`,{});
    }


    return(
        <div style={{height :'100vh',display:'flex', flexDirection:'column'}}>
            <Header headerText='Employees' buttonText='Add Employees' buttonCallback={GoToAdd}/>
            <EmployeesGrid/>
            <Footer/>
        </div>
    )
}