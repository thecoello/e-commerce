import { ProductsCrud } from "../controllers/productsController/productsCRUD";
import Product = require("../models/products");

class ProductsControllers  {
    static async Create(req, res) {
        const Post = await new ProductsCrud()
        await Post.Create(Product, req, res, "Product Registered");
    }
    static async Get(req, res) {
        const Post = await new ProductsCrud()
        await Post.Read(Product, req, res, "Product Founded");
    }
    static async GetPublic(req, res) {
        const Post = await new ProductsCrud()
        await Post.ReadPublic(Product, req, res, "Products Founded");
    }
    static async GetPublicByCategory(req, res) {
        const Post = await new ProductsCrud()
        await Post.ReadPublicbyCategory(Product, req, res, "Products Founded");
    }
    static async GetPublicByfilter(req, res) {
        const Post = await new ProductsCrud()
        await Post.ReadPublicbyfilter(Product, req, res, "Products Founded");
    }
    static async Update(req, res) {
        const Post = await new ProductsCrud()
        await Post.Update(Product, req, res, "Product Updated");
    }
    static async Delete(req, res) {
        const Post = await new ProductsCrud()
        await Post.Delete(Product, req, res, "Product Deleted");
    }

}

export = ProductsControllers;