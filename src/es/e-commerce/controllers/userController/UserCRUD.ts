import { DBDataCrud } from "../../DB crud/DBDataCrud";
import { ControllerCrud } from "../ControllerCrud";
import { ErrorCatch } from "../ErrorCatch";
import { TokenAction } from "../MWS/TokenAction";

export class UserCrud extends ControllerCrud {

    constructor() {
        super(new DBDataCrud())
    }

    async Create(param: any, req: any, res: any, msg: string) {
        try {
            const user = await this.CRUD.find(param, req, res, { email: req.body.email })

            if (user[0]) {
                res.end('this user exist');
            }

            const createUser = await this.CRUD.create(param, req, res, req.body)
            return await res.send({ message: msg, object: createUser });

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem creating the user')
        }
    }

    async Read(param: any, req: any, res: any, msg: string) {
        try {
            const user = await this.CRUD.find(param, req, res, { email: req.body.email })

            if (!user[0]) {
                res.end('this user exist');
            }

            const token = await TokenAction.ValToken(user[0]._id, req, res)

            if (token === true) {
                return await res.send({ message: msg, object: user[0] });
            }

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem getting the user')
        }
    }

    async Update(param: any, req: any, res: any, msg: string) {
        try {
            const user = await this.CRUD.find(param, req, res, { email: req.body.email })

            if (!user[0]) {
                return res.status(404).end('This user does not Exist');
            }

            const token = await TokenAction.ValToken(user[0]._id, req, res)

            if (token === true) {
                const userUpdate = await this.CRUD.update(param, req.body, res, { email: user[0].email })
                userUpdate.save()
                return await res.send({ message: msg, object: userUpdate });
            }

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem updating the user')
        }
    }

    async Delete(param: any, req: any, res: any, msg: string) {
    }

}