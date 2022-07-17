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
               userType: constants.userTypes.engineer,
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

          if (ticket) {

               const user = await User.findOne({
                    userId: req.userId
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
               message: "Some Internal Server Error "
          })
     }
}

/**
 * API to fetch all the Tickets
 * 
 * Allow the user to filter based on States , only the ticket creatar should fetch the tickets
 * 
 * TODO Extension :
 *   - using query param , allow the user to
 *     filter the list of tickets based on status
 * 
 * Depending on the user I need to return different list of tickets 
 * 
 * 1. ADMIN    - Return all tickets.
 * 2. ENGINEER - All the tickets, either created or Assigned by him/her.
 * 3. CUSTOMER - ALl the tickets created by him.
 */

exports.getAllTickets = async (req, res) => {
     /**
     * I want to get the list of all the tickets
     */

     const queryObj = {};


     const user = await User.findOne({ userId: req.userId });

     /**
      * If ADMIN , can able to see all the tickets created 
      */
     if (user.userType === constants.userTypes.admin) {
          /**
           * Return all the ticket 
           * No need to change in the QueryObj
           */
     }
     else if (user.userType == constants.userTypes.engineer) {
          /**
           * Get all the tickets Created or Assigned !
           */

          /* Have to Implement the feature of Engineer also create a ticket */
          // queryObj._id = {
          //      $in: user.ticketsCreated /* Array's of TicketID's */
          // };
          // ----
          queryObj.assignee = req.userId;

     }
     else if (user.userType == constants.userTypes.customer) {

          /**
           * if CUSTOMER ,should get ticket created by Him.
           */
          if (user.ticketsCreated == null || user.ticketsCreated.length == 0) {
               return res.status(200).send({
                    message: "No tickets created by You !!!"
               })
          }

          queryObj._id = {
               $in: user.ticketsCreated /* Array's of TicketID's */
          }
     }

     if (req.query.status != undefined) {
          queryObj.status = req.query.status;
     };


     console.log(queryObj);
     const tickets = await Ticket.find(queryObj);
     console.log("tickets.length : ", tickets.length);

     if (tickets == null || tickets.length == 0) {
          return res.status(200).send({
               message: `No Tickets Found with status = ${queryObj.status} !`
          })
     }

     return res.status(200).send({
          msg: `SUCCESS !,  ${user.userType} | ${user.userId} , Fetched All Tickets !`,
          tickets: objectConvertor.ticketListResponse(tickets)
     });

     /** 
          const tickets = [];
          var count = 0;
          user.ticketsCreated.forEach(async t => {
               ticketSaved = await Ticket.findOne({ _id : t});
               console.log(ticketSaved);
               tickets.push( ticketSaved );
               count ++;
               if( count >= user.ticketsCreated.length){
               return  res.status(200).send( objectConvertor.ticketListResponse(tickets));
               }
          })
     */

}

/**
 * Controller to fetch the Tickets based on ID's 
 */

exports.getOneTicket = async (req, res) => {

     const ticket = await Ticket.findOne({
          _id: req.params.id
     });

     res.status(200).send(objectConvertor.ticketResponse(ticket));
}

/**
 * Controller to Update the Ticket
 * 
 * TODO : 
 * 
 * 1. Assignee Engineer should be able to update the Ticket
 * 
 */

exports.updateTicket = async (req, res) => {

     /**
      * Check the Ticket exists 
      */
     const ticket = await Ticket.findOne({
          _id: req.params.id
     });

     if (ticket == null) {
          return res.status(200).send({
               message: "Ticket doesn't exist "
          })
     }

     try {


          /**
           * Only the Ticket Requester be allowed to update the Ticket
           */

          const user = await User.findOne({
               userId: req.userId
          });

          /**
           * Only checking for the user who has created the ticket
           * 
           * 1. ADMIN
           * 2. ENGINEER
           */

          if ( (user.ticketsCreated == undefined || !user.ticketsCreated.includes(req.params.id)) && !(user.userType == constants.userTypes.admin )&& !(ticket.assignee == req.userId) ) {
               return res.status(403).send({
                    message: "Only Owner of the Ticket is allowed to Update Ticket "
               })
          }

          /**
          * Update the Attributes of the Saved Ticket 
          */

          ticket.title = req.body.title != undefined ? req.body.title : ticket.title;
          ticket.description = req.body.description != undefined ? req.body.description : ticket.description;
          ticket.ticketPriority = req.body.ticketPriority != undefined ? req.body.ticketPriority : ticket.ticketPriority;
          ticket.status = req.body.status != undefined ? req.body.status : ticket.status;

          /** 
          * Saved the Changed Ticket
          */
          const updatedTicket = await ticket.save();

          /**  
           *  Return the Updated Ticket
           */
          return res.status(200).send({
               status: "Ticket Updated successfully !",
               ticket: objectConvertor.ticketResponse(updatedTicket)
          });
     }

     catch (error) {
          console.log("Ticket was being updated BY Someone , who has not created ticket !");
          return res.status(403).send({
               message: "Ticket can be Updated Only by Customer , who created it !"
          })
     }
}

