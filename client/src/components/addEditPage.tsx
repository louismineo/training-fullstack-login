import {Header} from './header'
import { EmployeeForm } from './employeeForm'
import { useEffect } from 'react';
import { decodeJwt } from 'jose';
import { useParams, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { uiActions } from '../store/uiSlice';
import { userStates } from '../store/uiSlice';
import { useNavigate } from 'react-router-dom';


export const AddEditPage = () =>
{
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

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
                dispatch(uiActions.updateDeptId(Number(decoded.deptId)))
                //const selector = useAppSelector(); 
                
            }
        },[dispatch])


    const GoBackToMain = ()=>
    {  
        dispatch(uiActions.updateUserState(userStates.isView))
        navigate(`/`,{});
    }


    const location = useLocation();
    const employeeData = location.state || {uuid:'' ,name: '', salary: 0, department: '' }; // Fallback in case no state is passed

    
    const {uuid} = useParams(); // Get uuid from the URL (if exists)
    let isAdd :boolean = false;

    if(uuid === undefined)
    {
        isAdd = true;
    }
        

    return (
        <div>
            <Header 
                headerText={ isAdd? 'Add Employee' : 'Edit Employee'} 
                buttonText='Go Back' 
                buttonCallback={GoBackToMain}
            />
            <div style = {{marginLeft:'10%', marginRight:'10%'}}>
            <EmployeeForm isAdd = {isAdd} employee={ employeeData}/>
            </div>
        </div>
    )
}