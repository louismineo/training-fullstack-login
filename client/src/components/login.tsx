import React, { ChangeEvent,FormEvent, useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, FormControl, InputLabel,Select,FormHelperText,MenuItem,SelectChangeEvent } from '@mui/material';
import { useAppSelector,useAppDispatch } from '../store/hooks'
import { useNavigate } from "react-router-dom"
import { LogInAction } from '../store/loginSignUpActions';
import { AxiosResponse } from 'axios';


export const Login = () =>
{
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [loginFormData, setLoginFormData] = useState(
        {
            username:'',
            password:''

        }
    )

    const handleChange = (e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) =>
    {
        const { name, value } = e.target;
        setLoginFormData({
            ...loginFormData,
            [name]: value
        });
    }

    const LoginHandler = async (e:FormEvent) =>
    {
        e.preventDefault();

        try
        {
            await dispatch(LogInAction(loginFormData.username, loginFormData.password))
            navigate('/',{})
        }
        catch(e:any)
        {
            alert(e.message)
        }
        
    }

    return (
        <div style= {{height:'100vh',backgroundColor:'black',display:'flex',flexDirection:'row',justifyContent : 'center', alignSelf:'center'}}>
            <Paper style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
                <Typography variant="h5" component="h1">Log in</Typography>
                <form>
                    <TextField
                    label="Username"
                    name= "username"
                    type="username"
                    value={loginFormData.username}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    /*
                    error = {!!signUpFormErrorData.usernameError}
                    helperText = {signUpFormErrorData.usernameError}
                    */
                    margin="normal"
                    required
                    />
                    <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={loginFormData.password}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    /*
                    error = {!!signUpFormErrorData.plaintextPasswordError}
                    helperText = {signUpFormErrorData.plaintextPasswordError}
                    */
                    margin="normal"
                    required
                    />
                    <Button type="submit" variant="contained" color="primary" onClick={LoginHandler}fullWidth>
                    Login
                    </Button>
                </form>
            </Paper>
        </div>
    )
} 