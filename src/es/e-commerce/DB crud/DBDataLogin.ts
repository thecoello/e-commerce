import { LoginI } from "./Interfaces/LoginI";
import bcrypt = require('bcryptjs')
import jwt = require('jsonwebtoken')

export class DBDataLogin implements LoginI {
   
    find(param,req,res,object){
        return param.find(object);
    }

    validation(req,pass){
        return bcrypt.compare(req, pass);
    }

    token(userID){
        return jwt.sign(userID, 'token');  
    }

}