import { TextField, MenuItem, Select, FormControl, InputLabel, Button, SelectChangeEvent, FormHelperText } from '@mui/material';
import { createEmployeeData, updateEmployeeData } from '../store/employeeActions';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ChangeEvent, FormEvent, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uiActions,userStates } from '../store/uiSlice';
import { readDepartmentData } from '../store/departmentActions';


export type employee = 
{
    uuid:string;
    name:string;
    salary:number;
    department:string;
    deptId:number;
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

    //getting the department mapping
    useEffect(()=>
    {
        dispatch(readDepartmentData())
    },[dispatch])
    const depts:object = useAppSelector((state)=>state.ui.departments)
    const departmentsArray = Array.isArray(depts) ? depts : [];
    //filter out the admin
    const filteredDepartment = departmentsArray.filter(dept => dept.deptId !== 1);

    const [formErrorData, setFormErrorData] = useState({
        name: '',
        salary: '',
        department: ''
    });

    const validateName = (input:string)=>
    {
        const regex = new RegExp('^[A-Za-z][A-Za-z0-9_]{7,29}$')


        if(input.length <4 || input.length >30 )
            return 'Name must be 4 to 30 characters.'
        else if (regex.test(input))
            return 'Name must not contain symbols or numbers.'
        else
            return '';
    }

    const validateSalary = (input:number)=>
    {
        if (input < 0)
            return 'Salary cannot be negative'
        else if (input > Number.MAX_SAFE_INTEGER )
            return 'Unrealistic salary, salary too large'
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
        department: employee.department,
        deptId: employee.deptId
    });

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;

        // if the name of the form input element is "salary", convert the value to a number
        let newValue: any = value;
        

        
        // special parsing and storin formData just for departments menu
        if (name === 'department') 
        {
            
            // querying the data from the array
            const selectedDeptName = filteredDepartment.find(item => item.name === String(value)); 
            setFormData({
                ...formData,
                department: value,
                deptId: selectedDeptName.deptId
            });
        } 
        else 
        {
            // For other fields, process normally
            newValue = name === 'salary' ? Number(value) : value;
            setFormData({
                ...formData,
                [name]: newValue
            });
        }

        // Update form errors based on the input field name
        switch (name) {
            case 'name':
                setFormErrorData({ ...formErrorData, name: validateName(String(newValue)) });
                break;
            case 'salary':
                setFormErrorData({ ...formErrorData, salary: validateSalary(Number(newValue)) });
                break;
            case 'department':
                setFormErrorData({ ...formErrorData, department: validateDepartment(String(newValue)) });
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
                dispatch(createEmployeeData(formData.name,formData.salary,formData.department,formData.deptId))
            }
            else
            {
                dispatch(updateEmployeeData(employee.uuid,formData.name,formData.salary,formData.department,formData.deptId))
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
                >{filteredDepartment.map((dept) => (
                    <MenuItem
                        key={dept.name}
                        value={dept.name} // Pass both name and id as JSON string
                    >
                        {dept.name}
                    </MenuItem>
                ))}
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

