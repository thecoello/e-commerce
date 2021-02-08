export interface CRUDI {
    find(param:any,req:any,res:any,object:any):any
    create(param:any,req:any,res:any,object:any):any
    update(param:any,req:any,res:any,object:any):any
    delete(param:any,req:any,res:any,object:any):any
}