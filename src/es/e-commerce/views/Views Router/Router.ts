export class Router {
    private _appname;
    private _routerView;
    private _router:String;

    constructor(appname: any, routerView: any,router:String){
        this._appname = appname;
        this._routerView = routerView;
        this._router = router
    }
    
    router(){
        return this._appname.use(this._router, this._routerView)
    }

}