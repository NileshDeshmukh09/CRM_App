const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const constants = require("../utils/constants");
/** 
 * Controller for Signup / Registration!
*/
async function signup(req, res){

    
    // userStatus : APPROVED | PENDING | REJECTED
    /**
     * UserType : Customer , userStatus : APPROVED
     * UserType : Engineer , userStatus : PENDING
     */

    var userStatus = req.body.userStatus;

    if( !req.body.userStatus ){
        if( !req.body.userType || req.body.userType == constants.userTypes.customer){
            userStatus = constants.userStatus.approved ;
        }else{
            userStatus = constants.userStatus.pending ;
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
    /**
     * Insert rtge Newuser to database
    */
   try{
    const userCreated = await User.create(userObj);
    console.log("User Created : " , userCreated);

    /**
     * Return the Response
    */

    const userCreationResponse = {
        name : userCreated.name,
        userID : userCreated.userID,
        email : userCreated.email,
        userType : userCreated.userType,
        userStatus : userCreated.userStatus,
        createdAt : userCreated.createdAt,
        updatedAt : userCreated.updatedAt,
        
    }

    res.status(201).send(userCreationResponse);
}catch(err){
    console.log("Error while Creating New User", err);
    res.status(500).send({
        message : "Some Internal Error while Inserting New user!",
    })

}

}

module.exports = { signup }