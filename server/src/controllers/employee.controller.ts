import { Request, Response } from "express";
import { GetAllEmployeesFromDB,AddNewEmployeeIntoDB,GetEmployeeByIDFromDB,UpdateEmployeeByIDFromDB,DeleteEmployeeByIDFromDB} from "../services/employee.service";
import {employeeRequestSchema,EmployeeRequest, EmployeeDef, ErrorResponse,GetAllEmployeeResponse, EmployeeReqToDef, getAllEmployeesResponse, errorResponseSchema,CreateZODErrorString } from "../types/employee.model"
import { NextFunction } from "connect";
import {ErrorHandler} from '../errors/employee.errors';


export async function GetAllEmployees(req:Request, res:Response, next:NextFunction) 
{
    try
    {
        //call getAllUsersFromService
        return res.status(200).json({'employees' :await GetAllEmployeesFromDB()});
    }
    catch (e)
    {
        const appError = ErrorHandler.handleErrors(e);
        let jsonMessage = errorResponseSchema.parse({errorMessage:appError.message});
        return res.status(appError.statusCode).json(jsonMessage);
    }
}

export async function AddNewEmployee(req:Request, res:Response, next:NextFunction)
{
    try
    {
        const new_emp_zodPasssed = employeeRequestSchema.parse(req.body);
        
        return res.status(200).json(await AddNewEmployeeIntoDB(new_emp_zodPasssed));
    }
    catch (e)
    {
        const appError = ErrorHandler.handleErrors(e);
        let jsonMessage = errorResponseSchema.parse({errorMessage:appError.message});
        return res.status(appError.statusCode).json(jsonMessage);
    }
}

export async function GetEmployeeByID(req:Request, res:Response, next:NextFunction)
{
    const uuid = req.params.emp_uuid;

    try
    {
       return res.status(200).json( await GetEmployeeByIDFromDB(uuid));
    }
    catch (e)
    {
        const appError = ErrorHandler.handleErrors(e);
        let jsonMessage = errorResponseSchema.parse({errorMessage:appError.message});
        return res.status(appError.statusCode).json(jsonMessage);
    }
}

export async function UpdateEmployeeByID(req:Request, res:Response, next:NextFunction)
{
    const uuid = req.params.emp_uuid;
     
    try
    {
        const new_emp_zodPasssed = employeeRequestSchema.parse(req.body);
        return res.status(200).json(await UpdateEmployeeByIDFromDB(uuid,new_emp_zodPasssed));
        
    }
    catch (e)
    {
        const appError = ErrorHandler.handleErrors(e);
        let jsonMessage = errorResponseSchema.parse({errorMessage:appError.message});
        return res.status(appError.statusCode).json(jsonMessage);
    }
}

export async function DeleteEmployeeByID(req:Request, res:Response, next:NextFunction)
{
    const uuid = req.params.emp_uuid;

    try
    {
        return res.status(204).json(await DeleteEmployeeByIDFromDB(uuid));
    }
    catch (e)
    {
        const appError = ErrorHandler.handleErrors(e);
        let jsonMessage = errorResponseSchema.parse({errorMessage:appError.message});
        return res.status(appError.statusCode).json(jsonMessage);
    }
}
