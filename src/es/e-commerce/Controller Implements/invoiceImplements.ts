import { findDatabase } from "../config/DDBB/findDatabase";
import Invoice = require("../models/invoice");
const ObjectId = require('mongodb').ObjectId

export class InvoiceCreate {

    static async invoice(product:any,invoiceNum:any,clientID:any,clientOrders:any){
    
        const productClient = []

        for (const Eachproduct of product) {
          const productFinal = await {
                name: Eachproduct.name,
                quantity: Eachproduct.quantity,
                price: Eachproduct.price
            }

            productClient.push(productClient)
        }

        const invoiceModel = await {
            products: product,
            date: Date.now(),
            invoiceNumber: invoiceNum,
            client: clientID
        }
        const InvoiceCreated = await Invoice.create(invoiceModel)
        const orders = await clientOrders
        orders.push(InvoiceCreated._id)

        return await [InvoiceCreated,orders]
    }

    static async InvoiceRead(orders){

        const invoices = []

        for (const shopsAll of orders) {

            for (const order of shopsAll.orders) {
                const invoice = await findDatabase.find("ecommerce", "invoices", { _id: ObjectId(order) })
                let subtotal = 0

                for (const products of invoice[0].products) {
                    subtotal += await products.price * products.quantity
                }

                const iva = await (subtotal * 21) / 100;

                const clientInfo = await shopsAll.toObject()
                delete clientInfo['orders']

                const Finalinvoice = await {
                    client: clientInfo,
                    invoiceNumber: invoice[0].invoiceNumber,
                    date: invoice[0].date,
                    products: invoice[0].products,
                    subtotal: subtotal,
                    iva: iva,
                    total: subtotal + iva
                }

                invoices.push(Finalinvoice)
            }
        }

        return await invoices
    }
}