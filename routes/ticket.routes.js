
const ticketController = require("../controllers/ticket.controller");
const { authJWT } = require("../middlewares");

module.exports = ( app ) => {
    /**
     * POST - 127.0.0.8080/crm/api/v1/tickets
     */
    app.post("/crm/api/v1/tickets" ,[ authJWT.verifyToken ], ticketController.createTicket );
    
    /**
     * GET - 127.0.0.8080/crm/api/v1/tickets
     */
    app.get("/crm/api/v1/tickets" ,[ authJWT.verifyToken ], ticketController.getAllTickets );

    /**
     * GET - 127.0.0.8080/crm/api/v1/tickets/:id
     */
    app.get("/crm/api/v1/tickets/:id" ,[ authJWT.verifyToken ], ticketController.getOneTicket  );

    /**
     * PUT - 127.0.0.8080/crm/api/v1/tickets/:id
     */
    app.put("/crm/api/v1/tickets/:id" ,[ authJWT.verifyToken ], ticketController.updateTicket  );


}