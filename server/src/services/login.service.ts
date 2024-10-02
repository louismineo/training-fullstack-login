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
    return "This should be JWT Token";

}

export async function SignUpHandler(username:string, plaintextPassword:string, deptId: number)
{
    const newUser = await User.create({'username' : username, 'password': await argon2.hash(plaintextPassword), 'deptId':deptId})
    return newUser;
}