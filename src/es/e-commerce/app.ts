import express = require("express")
import bodyParser = require("body-parser")

/**************************
Connection for the server 
**************************/
export const app = express();

app.listen(3000,()=>{
    console.log('Node server running on port 3000');
});

/**************************
Body Parser
**************************/
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/**************************
Call for the routers
**************************/


