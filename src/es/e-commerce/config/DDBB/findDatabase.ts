
import urlDatabase = require("./mongooseImpl");
const MongoClient = require('mongodb').MongoClient;

export class findDatabase {
    static async find(dataBaseName: String, collectionName: String, toFind: any) {

        const db = await MongoClient.connect(urlDatabase)

        return await db.db(dataBaseName).collection(collectionName).find(toFind).toArray()
        
    }
}