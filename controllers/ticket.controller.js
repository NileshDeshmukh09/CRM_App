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
 * 
 * Allow the user to filter based on States
 * 
 * TODO Extension :
 *   - using query param , allow the user to
 *     filter the list of tickets based on status
 */

exports.getAllTickets =async ( req, res ) => {

     


    

    /**
     * I want to get the list of all the tickets
     */
     console.log(req.userId)
     const user = await User.findOne({userId : req.userId});
     console.log("Ticket : ",user);

     if( user.ticketsCreated ==  null || user.ticketsCreated.length == 0 ){
          return  res.status(200).send({
               message : "No tickets created by You !!!"
          })
     }
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

     
     const tickets = await Ticket.find({
          _id: {
               $in : user.ticketsCreated /* Array's of TicketID's */
          }
     });

     const status = req.query.status;

     if(status === constants.ticketStatus.open){
          return res.status(200).send({
               message : "Successfully Fetched All users !",
               users : objectConvertor.ticketListResponse(tickets)// user Password will not be Returned in response.
           });
     }

     return res.status(200).send(objectConvertor.ticketListResponse(tickets));
     
     

}

