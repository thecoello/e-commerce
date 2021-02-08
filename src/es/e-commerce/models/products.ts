import mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    product: {
        type: Object,
        required: [true, "the product it's required"]
    },
    note: {
        type: String,
    },
    addres: {
        type: String,
        required: [true, "The price for the product it's required"]
    },
    category: {
        type: String,
        required: [true, "The category for the product it's required"],
    },
    role: {
        type: String,
        required: [true, "The role for the shop it's required"],
    }
});

const Product = mongoose.model('Products', ProductSchema);
export = Product;