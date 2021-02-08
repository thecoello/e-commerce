export interface LoginI {
    find(param,req,res,object):any
    validation(req,pass):any
    token(userID):any
}