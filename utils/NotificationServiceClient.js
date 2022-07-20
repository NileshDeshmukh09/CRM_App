/** 
 * Logic to make a POST Call to the Notification Service 
 */

const Client = require("node-rest-client").Client;

const client = new Client();

/**
 * Expose a function which will take the following information 
 * 
 * 1. Subject
 * 2. COntent
 * 3. ReceipentEmails,
 * 4. Requester
 * 5. TicketID
 * 
 * and then make a POST Call
 */

module.exports = (ticketId , subject , content , emailIds , requester ) => {

    /**
     * POST Call
     * 
     *      - URI : localhost:7777/notifservice/api/v1/notifications
     *      - HTTP Verb : POST
     *      - Request Body
     *      - Headers
     */

    /**
     * Request body
     */
    const reqBody = {
        subject : subject,
        content : content,
        recepientEmails : emailIds,
        requester : requester,
        ticketId : ticketId,
    }

    const headers = {
        "Content-Type" : "application/json"
    }

    const args = {
        data : reqBody,
        headers : headers
    }

    var req = client.post("http://127.0.0.1:7777/notifservice/api/v1/notifications" , args , (data , response ) => {
        console.log("Request Sent ");
        console.log( data );
    });

    /**
     * Check for the Errors 
     */


    // Event in case of Request Timeout
    req.on('requstTimeout' , function (req){
        console.log("Request has expired ");
        req.abort();
    });

    // Event in case of Response Timeout
    req.on('responseTimeout ' , function (res){
        console.log("Response has expired ");

    });

    req.on('error' , function (err) {
        console.log(' Request Error', err)
    })


}
