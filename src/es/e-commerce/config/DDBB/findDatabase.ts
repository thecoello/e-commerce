
import urlDatabase = require("./mongooseImpl");
const MongoClient = require('mongodb').MongoClient;

export class findDatabase {
    static async find(dataBaseName: String, collectionName: String, toFind: any) {
        const db = await MongoClient.connect(urlDatabase)
        return await db.db(dataBaseName).collection(collectionName).find(toFind).toArray()
    }

    static async findAndUpdate(dataBaseName: String, collectionName: String, toFind: any, toUpdate: any) {
        const db = await MongoClient.connect(urlDatabase)
        return await db.db(dataBaseName).collection(collectionName).findOneAndUpdate(toFind,{$set: toUpdate},{new:true})
    }

    static async findAndDelete(dataBaseName: String, collectionName: String, toDelete: any) {
        const db = await MongoClient.connect(urlDatabase)
        return await db.db(dataBaseName).collection(collectionName).findOneAndDelete(toDelete)
    }
}