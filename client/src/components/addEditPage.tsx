import {Header} from './header'
import { employee, EmployeeForm } from './employeeForm'
import { useParams, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { uiActions } from '../store/uiSlice';
import { userStates } from '../store/uiSlice';
import { useNavigate } from 'react-router-dom';


export const AddEditPage = () =>
{
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

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
        


    /*
    return (
        <div>
            <Header 
                headerText={isAddMode? 'Add Employee' : 'Edit Employee'} 
                buttonText='Go Back' 
                buttonCallback={GoBackToMain}
            />
            <div style = {{marginLeft:'10%', marginRight:'10%'}}>
            <EmployeeForm isAddMode = {isAddMode} employeeData={employeeData}/>
            </div>
        </div>
    )
    */

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