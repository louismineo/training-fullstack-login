// BASE CLASS
class AppError extends Error{
    public statusCode: number;

    constructor(message : string, statusCode: number)
    {
        super(message); // this will OVERRIDE the messages data member from Error inherited class.
        this.statusCode = statusCode;


    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this,this.constructor);
    }
}

import { NOTFOUND } from "dns";
import { stat } from "fs";
// SEQUELIZE ERRORS
import { ValidationError,DatabaseError } from "sequelize";

class SequelizeError extends AppError
{
    constructor(error : any)
    {
        let message = "Database error occured";
        let statusCode = 500;

        if(error instanceof ValidationError)
        {
            statusCode = 400;
            message = "Validation error: " + error.errors.map(e=>message).join(', ');
        }
        else if (error instanceof DatabaseError)
        {
            statusCode = 500;
            message = "Database error: " + error.message;
        }
        else
        {
            statusCode = 500;
            message = "Unknown Sequelize error occured. S E E K   H E L P";
        }

        super(message,statusCode)
    }
}

//ZOD ERRORS
import { string, ZodError } from "zod";
class ZodValidationError extends AppError
{
    constructor(error: ZodError)
    {
        const message = "Validation Error from Zod: " + error.errors.map(e=>e.message).join(', ');
        super(message, 400);
    }
}


export enum LogicErrorEnum {
    NotFound = "Employee not found.",
    NoChange = "No changes made."
}
export class LogicError extends AppError
{
    constructor(msg : LogicErrorEnum)
    {
        let statusCode = 500;
        let errorMessage = msg;

        if(msg == LogicErrorEnum.NotFound)
        {
            statusCode = 404;
            errorMessage = msg;
        }
        else
        {
            statusCode = 304; // no changes error
            errorMessage = msg;
        }
        super(errorMessage,statusCode);
    }
}

export class ErrorHandler{
    static handleErrors(error: any):AppError
    {
        if(error instanceof ValidationError || 
            error instanceof DatabaseError) 
            return new SequelizeError(error);
        else if (error instanceof ZodError)
            return new ZodValidationError(error);
        else if (error instanceof LogicError)
            return new AppError(error.message, error.statusCode);
        else
            return new AppError(error.message || 'An unknown error occurred', 500);
    }
}


