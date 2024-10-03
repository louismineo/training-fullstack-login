import { useNavigate } from "react-router-dom"

export const Login = () =>
{
    const navigate = useNavigate();


    


    return(
        <>
            <h1>THIS IS THE LOGIN PAGE</h1>

            <a href="/signup"> Register Here</a>
        </>
    )    
} 