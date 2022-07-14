const User = require("../models/user.model");
const Ticket = require("../models/ticket.model");
const constants = require("../utils/constants");
const objectConvertor = require("../utils/objectConvertor");

/**
 * Create a ticket 
 *  v1 - Anyone should be able to create the ticket
 */

exports.createTicket = async (req, res) => {

     const ticketObj = {
          title: req.body.title,
          description: req.body.description,
          ticketPriority: req.body.ticketPriority
     }

     /**
      * If the Engineer  is available 
      */
     try {
          const engineer = await User.findOne({
               userType: constants.userTypes.Engineer,
               userStatus: constants.userStatus.approved,
          })

          if (engineer) {
               ticketObj.assignee = engineer.userId
          }

          const ticket = await Ticket.create(ticketObj);

          /**
           * Ticket is created Now 
           *  
           * 1. We should update the Customer and Engineer Documents 
           */

          /**
           * Find Out the Customer
           */

          if( ticket ){

               const user = await  User.findOne({
                    userId : req.userId
               })
               /**
                * Update the Customer
                */
               user.ticketsCreated.push(ticket._id);
               await user.save();

               /**
                * Update the Engineer
                */
               engineer.ticketsAssigned.push(ticket._id);
               await engineer.save();


               return res.status(201).send({
                    msg: "Ticket , created Successfully !",
                    ticket: objectConvertor.ticketResponse(ticket)
               })   
          }
        
     } catch (error) {
          console.log(error);

          return res.status(500).send({
               message: "Some Internal Error "
          })
     }
}

/**
 * API to fetch all the Tickets
 */

exports.getAllTickets =async ( req, res ) => {

    /**
     * I want to get the list of all the tickets
     */
     const queryObj = {}; //  This I will use later.
     const tickets = await Ticket.find(queryObj);

     return res.status(200).send(objectConvertor.ticketListResponse(tickets));

}