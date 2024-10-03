const {Department} = require('../../models')

export async function GetAllDepartmentsFromDB() : Promise<any>
{
    const departments = await Department.findAll({attributes : ['deptId','name']})
    return departments;
}