const express = require("express");
const serverConfig = require("./configs/server.config");

const app = express();

/** 
 * Starrt the Express Server
*/

app.listen(serverConfig.PORT,() => {
    console.log(`Application has started on the http://localhost:${serverConfig.PORT}`);
});

