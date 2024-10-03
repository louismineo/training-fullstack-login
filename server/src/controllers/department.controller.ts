import { Request,Response,NextFunction } from "express"
import { GetAllDepartmentsFromDB } from "../services/department.service"


export async function GetAllDepartments(req:Request, res:Response, next:NextFunction)
{
    try
    {
        return res.status(200).json(await GetAllDepartmentsFromDB());
    }
    catch(e:any)
    {
        return res.status(401).json(e.message)   
    }
}