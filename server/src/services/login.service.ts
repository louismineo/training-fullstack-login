import * as argon2 from "argon2"
import * as jwt from "jsonwebtoken"

const {User} = require ('../../models')

export async function LoginHandler(username:string ,plaintextPassword:string) : Promise<any>
{
    //find username
    const user = await User.findOne({where:{'username' : username}})
    if(!user)
        throw new Error("Username Not Found")

    // check password
    const isPasswordMatch:boolean = await argon2.verify( user.password, plaintextPassword)

    if(!isPasswordMatch)
        throw new Error("Password is wrong")
    
    
    
    // return jwt
    try 
    {
        const token = jwt.sign({id : user.username , deptId : user.deptId}, 'this_is_a_jwt_secret_key', {expiresIn: '1h'});
        return token
    }
    catch (e)
    {
        console.log(e)
        //throw new Error(e.message)
    }
    

}

export async function SignUpHandler(username:string, plaintextPassword:string, deptId: number)
{

    if(username == null || username.length == 0)
        throw new Error ("Username cannot be empty or null")
    if(plaintextPassword == null || plaintextPassword.length == 0)
        throw new Error ("Password cannot be empty or null")
    if(deptId<1 || deptId >3)
        throw new Error ("Dept ID can only be 1 (Admin) , 2 (PS) or 3 (HR)")

    const newUser = await User.create({'username' : username, 'password': await argon2.hash(plaintextPassword), 'deptId':deptId})
    return newUser;
}