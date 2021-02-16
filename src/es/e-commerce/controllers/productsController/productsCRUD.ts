import { DBDataCrud } from "../../DB crud/DBDataCrud";
import { ControllerCrud } from "../ControllerCrud";
import { ErrorCatch } from "../ErrorCatch";
import { TokenAction } from "../MWS/TokenAction";
import { findDatabase } from '../../config/DDBB/findDatabase';
const ObjectId = require('mongodb').ObjectId

export class ProductsCrud extends ControllerCrud {

    constructor() {
        super(new DBDataCrud())
    }

    async Create(param: any, req: any, res: any, msg: string) {
        try {
            const userId = await TokenAction.decode(req);
            const findUser = await findDatabase.find("ecommerce", "users", { _id: ObjectId(userId) })

            if (!userId || !findUser[0]) {
                return res.status(401).end('You are not logged in');
            }

            const token = await TokenAction.ValToken(findUser[0]._id, req, res)

            if (token === true && findUser[0].role == 'seller') {

                const productExist = await this.CRUD.find(param, req, res, { name: req.body.name })

                if (!productExist[0]) {
                    req.body.seller = userId;
                    const product = await this.CRUD.create(param, req, res, req.body)
                    return await res.send({ message: msg, object: product });
                } else if (productExist[0]["seller"] == userId) {
                    return res.status(401).end('You have this product registered');
                }
            }

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem creating the product')
        }
    }

    async Read(param: any, req: any, res: any, msg: string) {
        try {
            const userId = await TokenAction.decode(req);
            const findUser = await findDatabase.find("ecommerce", "users", { _id: ObjectId(userId) })

            if (!userId || !findUser[0]) {
                return res.status(401).end('You are not logged in');
            }

            const token = await TokenAction.ValToken(findUser[0]._id, req, res)

            if (token === true && findUser[0].role == 'seller') {
                const product = await this.CRUD.find(param, req, res, { seller: userId })

                if (!product[0]) {
                    return res.status(404).end('You dont have products');
                }

                return await res.send({ message: msg, object: product});
            }

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem getting the user')
        }
    }

    async ReadPublic(param: any, req: any, res: any, msg: string) {
        try {

            const products = await this.CRUD.find(param, req, res, { })

            if(!products[0]){
                return res.status(404).end('Products not found');
            }

            return await res.send({ message: msg, object: products});

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem getting the user')
        }
    }

    async ReadPublicbyCategory(param: any, req: any, res: any, msg: string) {
        try {

            const products = await this.CRUD.find(param, req, res, {category: req.query.category})

            if(!products[0]){
                return res.status(404).end('Products not found');
            }

            return await res.send({ message: msg, object: products });

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem getting the user')
        }
    }

    async Update(param: any, req: any, res: any, msg: string) {
        try {
            const userId = await TokenAction.decode(req);
            const findUser = await findDatabase.find("ecommerce", "users", { _id: ObjectId(userId) })

            if (!userId || !findUser[0]) {
                return res.status(401).end('You are not logged in');
            }

            const token = await TokenAction.ValToken(findUser[0]._id, req, res)

            if (token === true && findUser[0].role == 'seller') {

                const productExist = await this.CRUD.find(param, req, res, { name: req.query.name })

                if ((productExist[0].seller !== userId) || !productExist[0]) {
                    return res.status(401).end('You dont have a product registered with this name');
                } else if (productExist[0].name === req.body.name) {
                    return res.status(401).end('You have other product registered with this name already');
                }

                const product = await this.CRUD.update(param, req.body, res, { _id: productExist[0]._id })
                return await res.send({ message: msg, object: product });
            }

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem updating the product')
        }
    }

    async Delete(param: any, req: any, res: any, msg: string) {
        try {
            const userId = await TokenAction.decode(req);
            const findUser = await findDatabase.find("ecommerce", "users", { _id: ObjectId(userId) })

            if (!userId || !findUser[0]) {
                return res.status(401).end('You are not logged in');
            }

            const token = await TokenAction.ValToken(findUser[0]._id, req, res)

            if (token === true && findUser[0].role == 'seller') {

                const productExist = await this.CRUD.find(param, req, res, { name: req.query.name })

                if ((productExist[0].seller !== userId) || !productExist[0]) {
                    return res.status(401).end('You dont have a product registered with this name');
                }

                const product = await this.CRUD.delete(param, req.body, res, { _id: productExist[0]._id })
                return await res.send({ message: msg, object: product });
            }


        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem deleting the user')
        }
    }

}