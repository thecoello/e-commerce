import mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    products:{
        type: Array,
        required: [true]
    },
    date:{
        type: String,
        required: [true]
    },
    invoiceNumber: {
        type: Number,
        required: [true]
    },
    client: {
        type: String,
        required: true
    }
});

const Invoice = mongoose.model('invoice', InvoiceSchema);
export = Invoice;