import mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "the name for the product it's required"]
    },
    description: {
        type: String,
    },
    price: {
        type: String,
        required: [true, "The price for the product it's required"]
    },
    category: {
        type: String,
        required: [true, "The category for the product it's required"],
    },
    seller: {
        type: String,
        required: [true, "The seller for the product it's required"],
    }
});

const Product = mongoose.model('Products', ProductSchema);
export = Product;