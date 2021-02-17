import { DBDataCrud } from "../../DB crud/DBDataCrud";
import { ControllerCrud } from "../ControllerCrud";
import { ErrorCatch } from "../ErrorCatch";
import { TokenAction } from "../MWS/TokenAction";
import { findDatabase } from '../../config/DDBB/findDatabase';
import { InvoiceCreate } from "../../Controller Implements/invoiceImplements";

const ObjectId = require('mongodb').ObjectId

export class purchaseCrud extends ControllerCrud {

    constructor() {
        super(new DBDataCrud())
    }

    async Create(param: any, req: any, res: any, msg: string) {
        try {

            const client = await this.CRUD.find(param, req, res, { email: req.body.email })
            const invoices = await findDatabase.find("ecommerce", "invoices", {})
            const products = []
            let invoiceNum = 1;

            for (const invoice of invoices) {
                invoiceNum = invoice.invoiceNumber + 1;
            }

            for (const product of req.body.products) {
                const productToBuy = await findDatabase.find("ecommerce", "products", { name: product[0] })

                if (!productToBuy[0]) {
                    return res.status(409).send({ message: 'No products founded', products: productToBuy });
                } else if (productToBuy[0].quantity <= 0) {
                    return res.status(409).send({ message: 'This products are out of stock', products: productToBuy });
                }

                let quantity = productToBuy[0].quantity - product[1]

                if (quantity < 0) {
                    quantity = 0;
                }

                await findDatabase.findAndUpdate("ecommerce", "products", { name: product[0] }, { quantity: quantity })

                productToBuy[0].quantity = product[1]
                products.push(productToBuy[0])
            }

            if (client[0]) {
                const order = await InvoiceCreate.invoice(products, invoiceNum, client[0]._id, client[0].orders)
                const clientUpdated = await this.CRUD.update(param, { orders: order[1] }, res, { _id: client[0]._id })
                return await res.send({ message: msg, client: clientUpdated, order: order[0] });
            }

            const clientNew = await this.CRUD.create(param, req, res, req.body)
            const order = await InvoiceCreate.invoice(products, invoiceNum, clientNew._id, clientNew.orders)
            const clientAndOrder = await this.CRUD.update(param, { orders: order[1] }, res, { _id: clientNew._id })

            return await res.send({ message: msg, client: clientAndOrder, order: order[0] });

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem creating the purchase')
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

            if (token == true && findUser[0].role == 'seller') {
                const purchases = await this.CRUD.find(param, req, res, {})

                if (!purchases[0]) {
                    return res.status(404).end('No purchases founded');
                }

                const invoices = await InvoiceCreate.InvoiceRead(purchases)
                return await res.send({ message: msg, invoices: invoices });

            }

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem reading the purchase')
        }
    }

    async ReadbyUser(param: any, req: any, res: any, msg: string) {
        try {
            const userId = await TokenAction.decode(req);
            const findUser = await findDatabase.find("ecommerce", "users", { _id: ObjectId(userId) })

            if (!userId || !findUser[0]) {
                return res.status(401).end('You are not logged in');
            }

            const token = await TokenAction.ValToken(findUser[0]._id, req, res)

            if (token == true && findUser[0].role == 'seller') {
                const purchases = await this.CRUD.find(param, req, res, { email: req.query.email })

                if (!purchases[0]) {
                    return res.status(404).end('No purchases founded with this user');
                }

                const invoices = await InvoiceCreate.InvoiceRead(purchases)
                return await res.send({message: msg, invoices: invoices });
            }

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem reading the purchase')
        }
    }

    async ReadBill(param: any, req: any, res: any, msg: string) {
        try {
            const userId = await TokenAction.decode(req);
            const findUser = await findDatabase.find("ecommerce", "users", { _id: ObjectId(userId) })

            if (!userId || !findUser[0]) {
                return res.status(401).end('You are not logged in');
            }

            const token = await TokenAction.ValToken(findUser[0]._id, req, res)

            if (token == true && findUser[0].role == 'seller') {

                if (!req.query.invoiceNumber) {
                    return res.status(409).send({ message: 'Invoice Number it is Required' });
                }

                const invoice = await findDatabase.find("ecommerce", "invoices", { invoiceNumber: parseInt(req.query.invoiceNumber) })

                if (!invoice[0]) {
                    return res.status(409).send({ message: 'Invoice does not exist' });
                }

                const purchase = await this.CRUD.find(param, req, res, { _id: ObjectId(invoice[0].client) })
                const invoices = await InvoiceCreate.InvoiceRead(purchase)
                const finalInvoice = []

                invoices.map(invoice => {
                    if (invoice.invoiceNumber == parseInt(req.query.invoiceNumber)) {
                        finalInvoice.push(invoice)
                    }
                })

                return await res.send({ message: msg, invoice: finalInvoice });
            }

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem reading the Bill')
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

                if (!req.query.invoiceNumber) {
                    return res.status(409).send({ message: 'Invoice Number it is Required' });
                }
                if (req.body.products) {
                    const products = []
                    for (const product of req.body.products) {
                        const productToBuy = await findDatabase.find("ecommerce", "products", { name: product[0] })

                        if (!productToBuy[0]) {
                            return res.status(409).send({ message: 'No products founded', products: productToBuy });
                        } else if (productToBuy[0].quantity <= 0) {
                            return res.status(409).send({ message: 'This products are out of stock', products: productToBuy });
                        }

                        let quantity = productToBuy[0].quantity - product[1]

                        if (quantity < 0) {
                            quantity = 0;
                        }

                        await findDatabase.findAndUpdate("ecommerce", "products", { name: product[0] }, { quantity: quantity })

                        productToBuy[0].quantity = product[1]
                        products.push(productToBuy[0])
                    }

                    await findDatabase.findAndUpdate("ecommerce", "invoices", { invoiceNumber: parseInt(req.query.invoiceNumber) }, { products: products })
                    const invoice = await findDatabase.find("ecommerce", "invoices", { invoiceNumber: parseInt(req.query.invoiceNumber) })

                    if (!invoice[0]) {
                        return res.status(409).send({ message: 'Invoice does not exist' });
                    }

                    const user = await this.CRUD.update(param, req.body, res, { _id: ObjectId(invoice[0].client) })
                    return await res.send({ message: msg, client: user, order: invoice[0]});
                }

                const invoice = await findDatabase.find("ecommerce", "invoices", { invoiceNumber: parseInt(req.query.invoiceNumber) })

                if (!invoice[0]) {
                    return res.status(409).send({ message: 'Invoice does not exist' });
                }

                const user = await this.CRUD.update(param, req.body, res, { _id: ObjectId(invoice[0].client) })
                return await res.send({ message: msg, client: user, order: invoice[0] });

            }

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem updating the purchase')
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

                if (!req.query.invoiceNumber) {
                    return res.status(409).send({ message: 'Invoice Number it is Required' });
                }

                const invoiceExist = await findDatabase.find("ecommerce", "invoices", { invoiceNumber: parseInt(req.query.invoiceNumber) })

                if (!invoiceExist[0]) {
                    return res.status(409).send({ message: 'Invoice does not exist' });
                }

                const invoice = await findDatabase.findAndDelete("ecommerce", "invoices", { invoiceNumber: parseInt(req.query.invoiceNumber) })
                const purchase = await this.CRUD.find(param, req, res, { _id: ObjectId(invoice.value.client) })

                const client = purchase.map(async (purchase) => {
                    const newOrders = []
                    for (const orders of purchase.orders) {
                        if (orders.toString() != invoice.value._id.toString()) {
                            newOrders.push(orders)
                        }
                    }

                    if (!newOrders[0]) {
                        this.CRUD.delete(param, req, res, { _id: ObjectId(purchase._id) })
                    }

                    purchase.orders = newOrders
                    return await this.CRUD.update(param, purchase, res, { _id: ObjectId(purchase._id) })
                })

                return await res.send({ message: msg, client: purchase[0], order: invoice.value });

            }

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem deleting the purchase')
        }
    }

}