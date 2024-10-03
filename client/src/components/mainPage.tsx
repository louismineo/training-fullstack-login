import { Header } from './header'
import { EmployeesGrid } from './employeesGrid'
import { Footer } from './footer'

import { decodeJwt } from 'jose';

import { uiActions,userStates } from '../store/uiSlice'
import { useEffect } from "react"
import { useAppDispatch,useAppSelector } from '../store/hooks'
import { readEmployeeData } from '../store/employeeActions'

import { useNavigate } from 'react-router-dom';

export const MainPage = () =>
{
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    

    //checking sessionstorage has the token or not
    useEffect(()=>
    {
        const token = sessionStorage.getItem('jwtToken');

        

        if(!token)
        {
                navigate('/login',{});
        }
        else
        {
            // decode the deptId, store in redux
            const decoded = decodeJwt(token);
            console.log(decoded.deptId)
            dispatch(uiActions.updateDeptId(Number(decoded.deptId)))
            //const selector = useAppSelector(); 
            
        }
    },[dispatch])


     const deptId = useAppSelector((state)=>state.ui.currentUserDeptId)
    // get the dispatch
    
    useEffect(()=>
    {
        //console.log('Dispatching action ... readEmployeeData');
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