import { MongooseCon } from "./MongooseCon";

/***********************
User Database Connection
************************/

const urlDatabase = 'mongodb://localhost:27017/ecommerce';
const Message = 'Connected to Database';
const DatabaseConnection = new MongooseCon(urlDatabase,Message).MongoConnect();

export = urlDatabase;
 


