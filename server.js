const express = require("express");
const mongoose= require("mongoose");
const serverConfig = require("./configs/server.config");
const dbConfig = require("./configs/db.config");

const app = express();

/**
 * Setup the MongoDB Connection and Create the ADMIN User
*/

mongoose.connect(dbConfig.DB_URL,() => {
    console.log("!!.. MongoDB Connected ..!!")
})

/** 
 * Starrt the Express Server
*/

app.listen(serverConfig.PORT,() => {
    console.log(`Application has started on the http://localhost:${serverConfig.PORT}`);
});

