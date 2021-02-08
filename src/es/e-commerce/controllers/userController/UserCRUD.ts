import { DBDataCrud } from "../../DB crud/DBDataCrud";
import { ControllerCrud } from "../ControllerCrud";
import { ErrorCatch } from "../ErrorCatch";

export class UserCrud extends ControllerCrud {

    constructor() {
        super(new DBDataCrud())
    }

    async Create(param:any,req:any,res:any,msg:string) {
        try {
            const user = await this.CRUD.find(param,req,res,{ email: req.body.email })
         
            if(user[0]){
                res.end('this user exist');
            }

            const createUser = await this.CRUD.create(param,req,res,req.body)
            return await res.send({ message: msg, object: createUser });

        } catch (error) {
            console.log(error)
        }
    }

    async Read(param:any,req:any,res:any,msg:string) {
       
    }

    async Update(param:any,req:any,res:any,msg:string) {

    }

    async Delete(param:any,req:any,res:any,msg:string) {
    }

}