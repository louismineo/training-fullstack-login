import React, { ChangeEvent,FormEvent, useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';


export const SignUp = () =>
{

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
        departmentId:1
    });

    const handleChange = (e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) =>//| SelectChangeEvent<string>)=>
    {
        const { name, value } = e.target;

        // if the name of the form input element is "salary", convert the value to a number
        const newValue = (name === 'departmentId' )? Number(value):value;       
        
        
        console.log(newValue)

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

    const handleSignUp = () =>
    {
        console.log("sign up button called")
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
                    margin="normal"
                    required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                    Sign Up
                    </Button>
                </form>
            </Paper>
        </div>
    )
}