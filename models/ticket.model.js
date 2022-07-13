/**
 * This file represents the schema for the ticket Resource
 */

const mongoose = require("mongoose");
const constants = require("../utils/constants");

const ticketSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    }, 

    description : {
        type : String,
        required : true,
    },

    ticketPriority : {
        type : Number,
        required : true,
        default : constants.ticketPriority.four //Possible values : 1/2/3/4
    },

    status : {
        type : String,
        required : true,
        default : constants.ticketStatus.open, // Possible values : OPEN / CLOSED / BLOCKED
    },

    reporter : {
        type : String,
    },

    assignee : {
        type : String,
    },

    createdAt : {
        type : Date,
        immutable : true,
        default : () => {
            return Date.now();
        }

        /**
         * 
         * 1.  default : ()=> { return Date.now() } . ( this is a function )
         *      OR
         * 2. default : Date.now() . ( this is a Execution )
         * 
         * Difference :
         *   ( if you write like 2nd one ,  at the time when schema is loaded . this line will executed as a default value.
         *      let' say schema is loaded  at time ( T1 ) , default value will set as T1 , after let's say Ticket1  is created at time  
         *      (T2 ) , if  you don't pass the  current value , the created time for ticket1 is still (T1) after half an hour you created
         *      Ticket2 at time ( T3 ), but the  default value is still T1.  ,because  these value is not getting computed everytime,     
         *      ye  to galat hai n ,       
         *      we want the time at which the ticket is created !, so the 1st one ensure that the time at which the ticket          
         *      is  created , that time getting stored )
         */
    }
})

module.exports = mongoose.model("Ticket" , ticketSchema);