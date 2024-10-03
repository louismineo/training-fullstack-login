import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { useState } from "react";

export const Login = () =>
{
    const navigate = useNavigate();

    const dispatch = useDispatch();


    return(
        <>
            <h1>THIS IS THE LOGIN PAGE</h1>

            <a href="/signup"> Register Here</a>
        </>
    )    
} 