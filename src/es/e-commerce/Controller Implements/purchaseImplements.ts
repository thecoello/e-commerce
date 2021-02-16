import { purchaseCrud } from "../controllers/PurchaseController/purchaseController";
import purchase = require("../models/purchase");

class PurchaseControllers  {
    static async Create(req, res) {
        const Post = await new purchaseCrud()
        await Post.Create(purchase, req, res, "purchase Registered");
    }
    static async Get(req, res) {
        const Post = await new purchaseCrud()
        await Post.Read(purchase, req, res, "purchase Founded");
    }
    static async GetOne(req, res) {
        const Post = await new purchaseCrud()
        await Post.ReadbyUser(purchase, req, res, "purchase Founded");
    }
    static async GetBill(req, res) {
        const Post = await new purchaseCrud()
        await Post.ReadBill(purchase, req, res, "Purchase Founded");
    }
    static async Update(req, res) {
        const Post = await new purchaseCrud()
        await Post.Update(purchase, req, res, "Purchase Updated");
    }
    static async Delete(req, res) {
        const Post = await new purchaseCrud()
        await Post.Delete(purchase, req, res, "Purchase Deleted");
    }

}

export = PurchaseControllers;