import { CRUDI } from "../../DB crud/Interfaces/CRUDI"

export abstract class ControllerCrud  {

    CRUD:CRUDI

    constructor(CRUD:CRUDI) {
        this.CRUD = CRUD
    }

    /*Pull up Method (Unidad temática: Dealing with generalisation), se crean metodos abstractos en esta super clase para heredar luego a las clases que extiendan de estas las cuales
    son los controladores (CRUD) EventCrud, UserCrud, InvitedCrud */

    public abstract Create(param:any,req:any,res:any,msg:string):any
    public abstract Read(param:any,req:any,res:any,msg:string):any
    public abstract Update(param:any,req:any,res:any,msg:string):any
    public abstract Delete(param:any,req:any,res:any,msg:string):any
   
}