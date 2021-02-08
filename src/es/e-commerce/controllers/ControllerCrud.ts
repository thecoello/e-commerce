import { CRUDI } from "../DB crud/Interfaces/CRUDI"

export abstract class ControllerCrud  {

    CRUD:CRUDI

    constructor(CRUD:CRUDI) {
        this.CRUD = CRUD
    }

    public abstract Create(param:any,req:any,res:any,msg:string):any
    public abstract Read(param:any,req:any,res:any,msg:string):any
    public abstract Update(param:any,req:any,res:any,msg:string):any
    public abstract Delete(param:any,req:any,res:any,msg:string):any
   
}