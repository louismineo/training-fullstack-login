import { TextField, MenuItem, Select, FormControl, InputLabel, Button, SelectChangeEvent, FormHelperText } from '@mui/material';
import { createEmployeeData, updateEmployeeData } from '../store/employeeActions';
import { useAppDispatch } from '../store/hooks';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uiActions,userStates } from '../store/uiSlice';

export type employee = 
{
    uuid:string;
    name:string;
    salary:number;
    department:string;
}

type EmployeeFormProp = 
{
    isAdd:boolean;
    employee: employee;
}





export const EmployeeForm = ({isAdd, employee}:EmployeeFormProp) =>
{
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const [formErrorData, setFormErrorData] = useState({
        name: '',
        salary: '',
        department: ''
    });

    const validateName = (input:string)=>
    {
        if(input.length <4 || input.length >30 )
            return 'Name must be 4 to 30 characters.'
        else
            return '';
    }

    const validateSalary = (input:number)=>
    {
        if (input < 0)
            return 'Salary cannot be negative'
        else 
            return '';
    }

    const validateDepartment = (input:string)=>
    {
        if (input === '')
            return 'Department cannot be empty'
        else 
            return '';
    }

    const [formData, setFormData] = useState({
        name: employee.name,
        salary: employee.salary,
        department: employee.department
    });

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;

        // if the name of the form input element is "salary", convert the value to a number
        const newValue = name === 'salary' ? Number(value):value;       
        
        setFormData({
            ...formData,
            [name]: newValue
        });


        switch(name)
        {
            case 'name':
                setFormErrorData({...formErrorData, name:validateName(String(newValue))})
                break;
            case 'salary':
                setFormErrorData({...formErrorData, salary:validateSalary(Number(newValue))})
                break;
            case 'department':
                setFormErrorData({...formErrorData, department:validateDepartment(String(newValue))})
                break;
            default:
                break;
        }
        
    };

    const submitHandler = (e : FormEvent) =>
    {
        e.preventDefault();

        const nameError = validateName(formData.name);
        const salaryError = validateSalary(formData.salary);
        const departmentError = validateDepartment(formData.department);
        
        console.log("name:"+!!nameError);
        console.log("salary"+!!salaryError);
        console.log("dept"+!!departmentError);

        if(nameError !=='' || salaryError !=='' || departmentError !=='')
        {
            setFormErrorData(
                {
                    name: nameError,
                    salary: salaryError,
                    department : departmentError
                }
            )
            return;
        }

        try 
        {
            if(isAdd)
            {
                dispatch(createEmployeeData(formData.name,formData.salary,formData.department))
                console.log(formData)
            }
            else
            {
                dispatch(updateEmployeeData(employee.uuid,formData.name,formData.salary,formData.department))
                console.log(formData)
            }

            alert(isAdd? formData.name + " has been added": employee.uuid + " has been edited.")
            //upon success, no erorrs thrown, go back to main page
            dispatch(uiActions.updateUserState(userStates.isView))
            navigate('/',{});
        }
        catch(e:any)
        {
            alert(e.message)
        }
    }

    


    return(
        <form>
            {/*name */}
            <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    error = {!!formErrorData.name}
                    helperText = {formErrorData.name}
                    margin="normal"
                    variant="outlined"

                required
                />

            {/*salary*/}
            <TextField
                    label="Salary"
                    name="salary"
                    type="number"
                    value={formData.salary}
                    onChange={handleChange}
                    fullWidth
                    error = {!!formErrorData.salary}
                    helperText = {formErrorData.salary}
                    margin="normal"
                    variant="outlined"
                required
                />

            {/* Department Select */}
            <FormControl fullWidth error = {!!formErrorData.department} margin="normal">
                <InputLabel id="department-label">Department</InputLabel>
                <Select
                    labelId="department-label"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    label="Department"
                    variant="outlined"
                required
                >
                    <MenuItem value="PS">PS</MenuItem>
                    <MenuItem value="HR">HR</MenuItem>
                </Select>
                <FormHelperText>{formErrorData.department}</FormHelperText>
            </FormControl>

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" onClick={submitHandler}>
                    {isAdd?'Create':'Save'}
            </Button>

        </form>
    )
}

