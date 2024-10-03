// express stuff
import express,{ Request, Response, NextFunction} from 'express'
import routerEmployees from './routes/employee.route'
import routerUsers from './routes/login.route'
import routerDepartments from './routes/department.route'
import { urlencoded } from 'body-parser';
import router from './routes/employee.route';
const cors = require ('cors')


// run and init the database connection
const {sequelize} = require('../models')






const app = express();
const port_number = 1337;

app.use(express.json())                 // support json
app.use(urlencoded({extended:true}));   // support url encoding of params
//app.use(cors);

app.use(cors({
  origin: 'http://localhost:5173'  // Allow the Vite frontend
}));

app.get("/",(req: Request , res: Response) =>
{
    return res.send("hello worlds");
})

app.use('/',routerEmployees);

app.use('/',routerUsers);

app.use('/', routerDepartments);

app.listen(port_number, async ()=>{
    console.log("Application listening at http://localhost:"+port_number);
    //console.log(getAllEmployees()); // typeof object
    checkDatabaseConnection();
    //await sequelize.sync({force:true});
    
});


async function checkDatabaseConnection() {
    try {
      await sequelize.authenticate({force:true});
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }