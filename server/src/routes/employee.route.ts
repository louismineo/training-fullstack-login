import {Router} from 'express'
import { GetAllEmployees,  AddNewEmployee ,GetEmployeeByID, UpdateEmployeeByID, DeleteEmployeeByID} from '../controllers/employee.controller';

let router = Router();

// GET /employee
router.get('/employee',GetAllEmployees);


// POST /employee
router.post('/employee', AddNewEmployee);


// GET /employee/{emp_id}
router.get('/employee/:emp_uuid',GetEmployeeByID);


// PUT /employee/{emp_id}
router.put('/employee/:emp_uuid',UpdateEmployeeByID);


// DELETE /employee/{emp_id}
router.delete('/employee/:emp_uuid',DeleteEmployeeByID);





export default router;