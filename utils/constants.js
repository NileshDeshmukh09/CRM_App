/**
 * This contains the constants to be used everyWhere in the Code.
 */

module.exports = {
    
    userTypes : {
        customer : "CUSTOMER",
        admin : "ADMIN",
        engineer : "ENGINEER"
    },

    userStatus : {
        pending : "PENDING",
        approved : "APPROVED",
        rejected : "REJECTED"
    },

    ticketStatus : {
        open : "OPEN",
        closed : "CLOSED",
        blocked : "BLOCKED",
        inProgress : "IN_PROGRESS",
    },

    ticketPriority : {
        one : 1,
        two : 2,
        three : 3,
        four : 4
    }
}