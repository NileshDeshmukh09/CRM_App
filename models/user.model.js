/**
 * This file will Hold the Schema for the User Resourcee !
*/

const mongoose = require("mongoose");

const userSchema = new  mongoose.Schema({

    /**
     * Name , UserID , password , email , createdAt , 
     * userType [ ADMIN | ENGINEER | CUSTOMER ],
     * userStatus { Pending | Approved | Rejected}
     */
    name : {
        type : String,
        required : true
    },

    userID : {
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        lowercase : true,
        minlength : true,
        unique : true,
    },

    createdAt : {
        type : Date , 
        immutable : true,
        default : ()=> {
            return Date.now();
        }
    },

    updatedAt : {
        type : Date ,
        default : () => {
            return Date.now();
        }
    },

    userType : {
         type : String ,
         required : true ,
         default : "CUSTOMER",
    },

    userStatus : {
        type :String,
        required : true,
        default :"APPROVED"
    }

});


module.exports = mongoose.model("User" , userSchema);