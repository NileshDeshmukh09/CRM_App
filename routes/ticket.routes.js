
const ticketController = require("../controllers/ticket.controller");

module.exports = ( app ) => {
    app.post("/crm/api/v1/tickets" , ticketController.createTicket );
}