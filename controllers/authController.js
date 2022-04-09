const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
/** 
 * Controller for Singup / Registration!
*/
function signup(req, res){

    
    // userStatus : APPROVED | PENDING | REJECTED
    /**
     * UserType : Customer , userStatus : APPROVED
     * UserType : Engineer , userStatus : PENDING
     */

    var userStatus = req.body.userStatus;

    if( !req.body.userStatus ){
        if( !req.body.userType || req.body.userType == "CUSTOMER"){
            userStatus = "APPROVED"
        }else{
            userStatus = "PENDING"
        }
    }

    // How the User Signup will Happen 
    const userObjToBeStoredInDB = {

        name : req.body.name,
        userID : req.body.userID,
        userType : req.body.userType,
        password : bcrypt.hashSync(req.body.passoword, 8),
        userStatus : userStatus

    }

}

module.exports = { signup }