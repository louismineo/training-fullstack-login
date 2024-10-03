import { NextFunction, Request, Response } from "express";
import { LoginHandler ,SignUpHandler} from "../services/login.service";


// POST login

export async function Login(req: Request, res:Response, next:NextFunction)
{
    try
    {
        return res.status(200).json({'token:' : await LoginHandler(req.body.username, req.body.password)});
    }
    catch (e : any)
    {
        return res.status(401).json(e.message);
    }
}

export async function SignUp(req: Request, res:Response, next:NextFunction)
{
    try
    {
        return res.status(200).json({'status' : await SignUpHandler(req.body.username, req.body.password,req.body.deptId)});
    }
    catch (e : any)
    {
        return res.status(401).json(e.message);
    }
}