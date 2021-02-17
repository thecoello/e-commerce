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

                return await res.send({ message: msg, object: product });
            }

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem getting the products')
        }
    }

    async ReadPublic(param: any, req: any, res: any, msg: string) {
        try {

            const products = await this.CRUD.find(param, req, res, {})

            if (!products[0]) {
                return res.status(404).end('Products not found');
            }

            return await res.send({ message: msg, object: products });

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem getting the products')
        }
    }

    async ReadPublicbyCategory(param: any, req: any, res: any, msg: string) {
        try {

            const products = await this.CRUD.find(param, req, res, { category: req.query.category })

            if (!products[0]) {
                return res.status(404).end('Products not found');
            }

            return await res.send({ message: msg, object: products });

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem getting the products')
        }
    }

    async ReadPublicbyfilter(param: any, req: any, res: any, msg: string) {
        try {

            const products = await this.CRUD.find(param, req, res, {})
            const sortable = []
            let productFiltered


            if (!products[0]) {
                return await res.status(404).end('Products not found');
            }

            if (req.query.filter == 'priceas') {
                for (const product of products) {
                    sortable.push([product, product.price])
                }

                sortable.sort(function (a, b) {
                    return a[1] - b[1]
                })

                productFiltered = sortable.map(product => {
                    return product[0]
                })

            }

            if (req.query.filter == 'pricedes') {
                for (const product of products) {
                    sortable.push([product, product.price])
                }

                sortable.sort(function (a, b) {
                    return b[1] - a[1]
                })

                productFiltered = sortable.map(product => {
                    return product[0]
                })

            }

            if (req.query.filter == 'title') {
                for (const product of products) {
                    sortable.push([product, product.name])
                }

                for (const product of sortable) {

                    sortable.sort((a, b) => {

                        var nameA = a[1].toUpperCase();
                        var nameB = b[1].toUpperCase();

                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;

                    })

                    productFiltered = sortable.map(product => {
                        return product[0]
                    })
                }
            }

            if (req.query.filter == 'bestseller') {
                const invoices = await findDatabase.find("ecommerce", "invoices", {})

                if(invoices[0]){

                    const productAndQuantity = []
                    const products = []
                    const productCount = {}
                    const product = []
    
                    invoices.map(invoice => {
                        invoice.products.map(product => {
                            productAndQuantity.push([product.name, product.quantity])
                        })
                    })
    
                    for (const product of productAndQuantity) {
                        while (product[1] !== 0) {
                            products.push(product[0])
                            product[1]--
                        }
                    }
    
                    for (const product of products) {
                        productCount[product] = (productCount[product]||0)+1
                    }
    
                    for (const productAndQ in productCount) {
                        product.push([productAndQ, productCount[productAndQ]])
                    }
    
                    product.sort(function (a, b) {
                        return b[1] - a[1]
                    })
    
                    const bestSellerProducts = []
    
                    for (const findProduct of product) {
                        const products = await this.CRUD.find(param, req, res, {name: findProduct[0]})
                        bestSellerProducts.push(products)
                    }
    
                    productFiltered = bestSellerProducts
                    
                }

                return await res.status(409).end('There is not products sold, try filtering by title or price');

            }

            return await res.send({ message: msg, object: productFiltered });

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem getting the products')
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
            return ErrorCatch.errorReturn(error, res, 'There was a problem deleting the product')
        }
    }

}