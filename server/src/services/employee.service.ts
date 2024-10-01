import { NextFunction } from 'connect'
import { employeeDefSchema,EmployeeRequest } from '../types/employee.model'
import {ErrorHandler, LogicError, LogicErrorEnum,} from '../errors/employee.errors';


const {Employee} = require('../../models');

export async function GetAllEmployeesFromDB() : Promise<any>
{

    const allEmployees = await Employee.findAll({attributes : ['uuid','name','salary','department']})
    return allEmployees;
}

export async function AddNewEmployeeIntoDB(emp_req:EmployeeRequest) : Promise<any>
{
        //insert 
        const newEmployee = await Employee.create(emp_req);
        return newEmployee; 
}

export async function GetEmployeeByIDFromDB(uuid:string) : Promise<any>
{

        const employee = await Employee.findOne({where :{uuid}})
        
        if(employee === null)
            throw new LogicError(LogicErrorEnum.NotFound);

        return employee;
}

export async function UpdateEmployeeByIDFromDB(uuid:string, new_params:EmployeeRequest) : Promise<any>
{

    const employee = await Employee.findOne({where :{uuid}});

    if (employee === null)
        throw new LogicError(LogicErrorEnum.NotFound);

    if (employee.name == new_params.name &&
        employee.salary == new_params.salary &&
        employee.department == new_params.department 
    )
        throw new LogicError(LogicErrorEnum.NoChange);


    employee.name = new_params.name;
    employee.salary = new_params.salary;
    employee.department = new_params.department;


    await employee.save();
    return employee;

}

export async function DeleteEmployeeByIDFromDB(uuid:string)
{
        const employee = await Employee.findOne({where:{uuid}});

        if (employee === null)
            throw new LogicError(LogicErrorEnum.NotFound);
        
        await employee.destroy();

        return employee;
}