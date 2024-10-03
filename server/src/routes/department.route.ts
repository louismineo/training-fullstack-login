import { Router } from "express";
import { GetAllDepartments } from "../controllers/department.controller";

let router = Router();

//GET

router.get('/departments',GetAllDepartments);

export default router;