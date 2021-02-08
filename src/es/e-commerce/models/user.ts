import bcrypt = require('bcryptjs');
import mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    username: {
        type: String,
        required: [true, "the username it's required"]
    },
    email: {
        type: String,
        required: [true, "The email it's required"]
    },
    password: {
        type: String,
        required: [true, "The password it's required"],
        minlength: [8, "Password is shorter than the minimum allowed length (8)"],
    },
    role: {
        type: String,
        default: 'admin',
        enum: ['admin', 'user', 'seller']
    }
});

UserSchema.pre<any>('save',async function () {
    this.password = await bcrypt.hash(this.password, 9) 
})

UserSchema.methods.toJSON = (function(){
    const documents = this.toObject()
    delete documents['password']
    return documents
})

const User = mongoose.model('User', UserSchema);
export = User;