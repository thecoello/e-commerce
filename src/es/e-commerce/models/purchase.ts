import mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "the name it's required"]
    },
    lasname: {
        type: String,
        required: [true, "the lastname it's required"]
    },
    addres: {
        type: String,
        required: [true, "The addres it's required"]
    },
    email: {
        type: String,
        required: [true, "The email it's required"],
    },
    phone: {
        type: String,
        required: [true, "The phone it's required"],
    },
    role: {
        type: String,
        default: 'user',
        required: [true, "The seller for the product it's required"],
    },
    orders: {
        type: Array,
        required: [true]
    }
});

purchaseSchema.methods.toJSON = (function(){
    const documents = this.toObject()
    delete documents['orders']
    return documents
})

const purchase = mongoose.model('purchase', purchaseSchema);
export = purchase;