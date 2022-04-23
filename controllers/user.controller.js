/**
 * This file will have all the logic to manipulate the User resource 
*/

const User = require("../models/user.model");
const objectConvertor = require("../utils/objectConvertor")

/**
 * Fetch the list of all the Users
 *   - Only ADMIN is allowed to call this method 
 *   - ADMIN should be able to filter based on :
 *     1. Name
 *     2. userType
 *     3. userStatus
*/

async function findAllUsers(req, res){

    /**
     * Write the code here to fetch all the Users from the DB.
     * 
     * Fetch the User Documents from the user Collection
     */
    try {
        const users  = await User.find();
        return res.status(200).send({
            message : "Successfully Fetched All users !",
            users : objectConvertor.userResponse(users)// user Password will also be Returned in response.
        });
    } catch (error) {
        console.log(err);
        return  res.status(500).send({
            status: 500,
            message : "Internal Error while Fetching all Users."
        })
    }
}


/**
 * Fetch the User based on the UserID
 */
async function findUserByID(req, res){
    const userIDReq = req.params.userId; // reading from the Request Parameter

    const user = await  User.find({ userId : userIDReq });

    if( user ){
        return res.status(200).send({
            message : "Successfully Fetched  user !",
            users : objectConvertor.userResponse(user)// user Password will also be Returned in response.
        })
    }else{
        return res.status(200).send({
            message : "user with id "+ userIDReq + "doesn't exist",
        })
    }

}

/** 
 * Update the User - Status , userType
 *   - only ADMIN shouldd be allowed to do this !
 */

module.exports = { findAllUsers , findUserByID }