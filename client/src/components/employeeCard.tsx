
import { Employee } from '../store/employeesSlice';
import Modal from './Modal';
import { useState } from 'react';
import { deleteEmployeeData } from '../store/employeeActions';
import { uiActions,userStates } from '../store/uiSlice';
import { useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil,  faTrash} from "@fortawesome/free-solid-svg-icons"

import {IconButton} from 'rsuite';
import "rsuite/dist/rsuite.min.css";


type EmployeeCardProps = 
{
    emp: Employee
}


export const EmployeeCard = ({emp}: EmployeeCardProps)=>
{
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);

    const editEmployeeHandler = (emp:Employee) =>
    {
        dispatch(uiActions.updateUserState(userStates.isEdit))
        navigate(`/addEdit/${emp.uuid}`, {state:emp})
    }

    const deleteEmployeeHandler = () =>
    {
        setOpenModal(true)
    }

    const cancelDelete = () =>
    {
        setOpenModal(false);
    }

    const confirmDelete = (emp:Employee) =>
    {
        dispatch(deleteEmployeeData(emp.uuid))
        alert(emp.name+" has been deleted.");
        setOpenModal(false);
        window.location.reload();
    }

    return (
        <div style={
            {
                width:"80%",
                height:'80%',
                backgroundColor : '#EAEAEA',
                display: "flex",
                flexDirection: "row",
                alignItems:"center",
                justifyContent:'space-between'
            }}>
            <div style = {{width:"80%",height:'100%', padding: 10, display: 'flex', flexDirection:'column',justifyContent:'center'}}>
                <div style= {{color:'#375270', fontSize: 'calc(0.04* 100vh)', fontWeight:'bolder'}}>{emp.name}</div>
                <div style= {{color:'#375270', fontSize:'calc(0.03* 100vh)',}}>{emp.department}</div>
                <div style= {{color:'#375270',fontSize:'calc(0.03* 100vh)',}}>${emp.salary.toLocaleString()}</div>
            </div>
            <div style={{width:"20%",display:"flex",verticalAlign:"center",justifyContent:'right'}}>
                <IconButton circle icon={<FontAwesomeIcon icon = {faPencil}/>} color="orange" appearance="link" onClick = {()=>editEmployeeHandler(emp)}/>
                <IconButton circle icon={<FontAwesomeIcon icon = {faTrash}/>} color="red" appearance="link" onClick={deleteEmployeeHandler} />
                <Modal isOpen = {openModal} emp={emp} cancelModalCallback={cancelDelete} confirmModalCallback={confirmDelete}/>
            </div>
        </div>
    )
}