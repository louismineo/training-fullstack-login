import React, { ChangeEvent,FormEvent, useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, FormControl, InputLabel,Select,FormHelperText,MenuItem,SelectChangeEvent } from '@mui/material';
import { useAppSelector,useAppDispatch } from '../store/hooks'
import { readDepartmentData } from '../store/departmentActions'
import { SignUp as SignUpAction } from '../store/loginSignUpActions';
import {useNavigate } from 'react-router-dom';

export const SignUp = () =>
{
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    //getting the department mapping
    useEffect(()=>
    {
        dispatch(readDepartmentData())
    },[dispatch])
    const depts:object = useAppSelector((state)=>state.ui.departments)
    const departmentsArray = Array.isArray(depts) ? depts : [];


    const [signUpFormErrorData, setSignUpFormErrorData] = useState({
        usernameError:'',
        plaintextPasswordError:'',
        deptIdError:''
    });

    const validateUsername = (input:string)=>
    {
        const regex = new RegExp('^[A-Za-z][A-Za-z0-9_]{7,29}$')


        if(input.length <4 || input.length >30 )
            return 'Username must be 4 to 30 characters.'
        else if (regex.test(input))
            return 'Username must not contain symbols or numbers.'
        else
            return '';
    }
    
    const validatePassword = (input:string)=>
    {
        const regex = new RegExp('^[A-Za-z][A-Za-z0-9_]{7,29}$')


        if(input.length <4 || input.length >30 )
            return 'Password must be 4 to 30 characters.'
        else if (regex.test(input))
            return 'Password must not contain symbols or numbers.'
        else
            return '';
    }

    const validateDepartment = (input:number)=>
    {
        if (input<1 || input > 3)
            return 'Department cannot be empty'
        else 
            return '';
    }

    const [signUpFormData, setSignUpFormData] = useState({
        username:'',
        password:'',
        departmentId:''
    });

    const handleChange = (e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent<string>)=>
    {
        const { name, value } = e.target;

        // if the name of the form input element is "salary", convert the value to a number
        const newValue = (name === 'departmentId' )? Number(value):value;       
        
        

        setSignUpFormData({
            ...signUpFormData,
            [name]: newValue
        });


        switch(name)
        {
            case 'username':
                setSignUpFormErrorData({...signUpFormErrorData, usernameError:validateUsername(String(newValue))})
                break;
            case 'password':
                setSignUpFormErrorData({...signUpFormErrorData, plaintextPasswordError:validatePassword(String(newValue))})
                break;
            case 'departmentId':
                setSignUpFormErrorData({...signUpFormErrorData, deptIdError:validateDepartment(Number(newValue))})
                break;
            default:
                break;
        }
    };

    const SignUpHandler = (e:FormEvent) =>
    {
        e.preventDefault();

        const usernameError = validateUsername(signUpFormData.username);
        const plaintextPasswordError = validatePassword(signUpFormData.password);
        const departmentIdError = validateDepartment(Number(signUpFormData.departmentId));
        

        if(usernameError !=='' || plaintextPasswordError !=='' || departmentIdError !=='')
        {
            setSignUpFormErrorData(
                {
                    usernameError: usernameError,
                    plaintextPasswordError: plaintextPasswordError,
                    deptIdError : departmentIdError
                }
            )
            return;
        }

        dispatch(SignUpAction(signUpFormData.username,signUpFormData.password, Number(signUpFormData.departmentId)))
        navigate('/login',{});
    }



    return (

        <div style= {{height:'100vh',backgroundColor:'black',display:'flex',flexDirection:'row',justifyContent : 'center', alignSelf:'center'}}>
            <Paper style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
                <Typography variant="h5" component="h1">Sign Up</Typography>
                <form>
                    <TextField
                    label="Username"
                    name= "username"
                    type="username"
                    value={signUpFormData.username}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    error = {!!signUpFormErrorData.usernameError}
                    helperText = {signUpFormErrorData.usernameError}
                    margin="normal"
                    required
                    />
                    <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={signUpFormData.password}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    error = {!!signUpFormErrorData.plaintextPasswordError}
                    helperText = {signUpFormErrorData.plaintextPasswordError}
                    margin="normal"
                    required
                    />

                    {/* Department Select */}
                    <FormControl fullWidth error = {!!signUpFormErrorData.deptIdError} margin="normal">
                        <InputLabel id="department-label">Department</InputLabel>
                        <Select
                            labelId="department-label"
                            name="departmentId"
                            value={signUpFormData.departmentId}
                            onChange={handleChange}
                            label="Department"
                            variant="outlined"
                            required
                            >
                            {departmentsArray.map((dept)=>
                                (
                                    <MenuItem value={dept.deptId}>{dept.name}</MenuItem>
                                ))
                            }
                        </Select>
                        <FormHelperText>{signUpFormErrorData.deptIdError}</FormHelperText>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" onClick={SignUpHandler}fullWidth>
                    Sign Up
                    </Button>
                </form>
            </Paper>
        </div>
    )
}