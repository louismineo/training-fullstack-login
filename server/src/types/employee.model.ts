// the schema definition of employee

import e from "express";
import zod, { z } from "zod";



export const employeeRequestSchema = zod.object(
    {
        
        name        : zod.string(),
        salary      : zod.number().int(),
        department  : zod.enum(['HR','PS']),
        deptId: zod.number().int()
    }
);
export type EmployeeRequest = zod.infer<typeof employeeRequestSchema>;



export const employeeDefSchema = zod.object(
    {
        uuid        : zod.string().uuid(),
        name        : zod.string(),
        salary      : zod.number().int(),
        department  : zod.enum(['HR','PS']),
        deptId: zod.number().int()
    }
);
export type EmployeeDef = zod.infer<typeof employeeDefSchema>;


export const getAllEmployeesResponse = zod.array(employeeDefSchema);
export type GetAllEmployeeResponse = zod.infer<typeof getAllEmployeesResponse>;


export const errorResponseSchema = zod.object(
    {
        errorMessage    : zod.string()
    }
);
export type ErrorResponse = zod.infer<typeof errorResponseSchema>;


export function EmployeeDefToReq( param:EmployeeDef ) : EmployeeRequest
{
    return {name:param.name, salary:param.salary, department:param.department, deptId:param.deptId};
}

export function EmployeeReqToDef(uuid:string, param:EmployeeRequest ) : EmployeeDef
{
    return {uuid:uuid,
            name:param.name,
            salary:param.salary,
            department:param.department,
            deptId:param.deptId
        };
}


export function CreateZODErrorString(z_err: zod.ZodError)
{
    let ret_string : string= "Body Param Error "
    for(let i =0 ; i < z_err.issues.length;i++)
    {
        ret_string+=(i+1);
        ret_string+=". For Key, " + z_err.issues[i].path[0]+ ". " + z_err.issues[i].message + "  ";
    }

    return ret_string;
}