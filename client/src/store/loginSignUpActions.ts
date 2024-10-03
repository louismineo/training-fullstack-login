import axios from "axios"
import {AxiosResponse} from "axios"


export const SignUp = (username :string, plaintextPassword:string, departmentId : number) =>
{
    return async(dispatch :any) =>
    {
        const createUserInDB = async(username :string, plaintextPassword:string, departmentId : number) =>
        {
            const userData = 
            {
                "username":username,
                "password" : plaintextPassword,
                "deptId" : departmentId
            }   

            const response = await axios.post('http://localhost:1337/signup/', userData);

            if(response.status != 200)
                throw Error(response.data); 

            return response;
        }

        try 
        {
            const response = await createUserInDB(username, plaintextPassword, departmentId);

            return response;
        }
        catch(e:any)
        {
            alert(e.message);
        }
    }
}


export const LogInAction = (username :string, plaintextPassword:string) =>
    {
        return async(dispatch :any) =>
        {
            const LogUserInInDB = async(username :string, plaintextPassword:string) =>
            {
                const userData = 
                {
                    "username" : username,
                    "password" : plaintextPassword
                }

                const response = await axios.post('http://localhost:1337/login/', userData);

                if(response.status != 200)
                    throw Error(response.data); 
            
                return response.data;
            }
    
            try 
            {
                const response = await LogUserInInDB(username, plaintextPassword);
                sessionStorage.setItem('jwtToken',response["token"])
                return response;
            }
            catch(e:any)
            {
                alert(e.message)
            }
        }
    }