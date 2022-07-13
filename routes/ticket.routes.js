
const ticketController = require("../controllers/ticket.controller");
const { authJWT } = require("../middlewares");

module.exports = ( app ) => {
    /**
     * POST - 127.0.0.8080/crm/api/v1/tickets
     */
    app.post("/crm/api/v1/tickets" ,[ authJWT.verifyToken ], ticketController.createTicket );
}