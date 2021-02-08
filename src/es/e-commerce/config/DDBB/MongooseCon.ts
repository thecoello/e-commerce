import { mongooseI } from "./mongooseI";
const mongoose = require('mongoose');

export class MongooseCon implements mongooseI {
    private _url: String;
    private _msg: String;
    private _err: String

    constructor(url: String, msg: String) {
        this._url = url;
        this._msg = msg;
    }


    async MongoConnect() {

        const url = this._url;
        const msg = this._msg

        await mongoose.connect(this._url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,

        })
         
        .then(async () => {
            await console.log(this._msg)
        })
            .catch(async (err) => {
                await console.error(err);
            });

    }

    static async MongoClose() {
        console.log("... Test Ended");
        await mongoose.connection.close();
    }
}