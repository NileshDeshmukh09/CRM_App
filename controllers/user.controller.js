/**
 * This file will have all the logic to manipulate the User resource 
*/

const User = require("../models/user.model");
const objectConvertor = require("../utils/objectConvertor")
 
/**
 * Fetch the list of all the Users
 *   - Only ADMIN is allowed to call this method - DONE
 *   - ADMIN should be able to filter based on : 
 *     1. Name
 *     2. userType
 *     3. userStatus
*/

async function findAllUsers(req, res){

    /**
     * Read the data from the Query parameters
    */
   const nameReq = req.query.name;
   const userStatusReq = req.query.userStatus;
   const userTypeReq = req.query.userType;

   const mongoQueryObj = {};

   if(nameReq && userStatusReq && userTypeReq){

       mongoQueryObj.name = nameReq;
       mongoQueryObj.userStatus = userStatusReq;
       mongoQueryObj.userType = userTypeReq;

   }else if( userStatusReq && userTypeReq ){

       mongoQueryObj.userStatus = userStatusReq;
       mongoQueryObj.userType = userTypeReq;

   }else if( nameReq && userStatusReq ){

       mongoQueryObj.name = nameReq;
       mongoQueryObj.userStatus = userStatusReq;

   }else if(nameReq ){

        mongoQueryObj.name = nameReq;

   }else if(userStatusReq ){
       
        mongoQueryObj.userStatus = userStatusReq;

   }else if(userTypeReq ){
        mongoQueryObj.userType = userTypeReq;
   }

   console.log(mongoQueryObj);

    /**
     * Write the code here to fetch all the Users from the DB.
     * 
     * Fetch the User Documents from the user Collection
     */
    try {
        const users  = await User.find(mongoQueryObj);
        return res.status(200).send({
            message : "Successfully Fetched All users !",
            users : objectConvertor.userResponse(users)// user Password will not be Returned in response.
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

    /**
     * Here , I have not used findOne instead of find , 
     *  
     *      If I use findOne : It would have given me just One Entries 
     *      When I use find : , it will return me one Entries , but in the form of Array,
     *           I already have one Method which converts the array objects 
     *           and transform into the array of objects , which Okay for us !
     */
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
 * 
 * ADMIN  - name , userStatus , userType
 */

function updateUser(req, res){
    /**
     * One of the ways of Updating
     */
    try{
        const userIDReq = req.params.userId;
        const user = User.findOneAndUpdate({userId : userIDReq} ,{
            name : req.body.name,
            userStatus : req.body.userStatus,
            userType : req.body.userType,
        }).exec();

        console.log("UserStatus : ", req.body.userStatus)

        res.status(200).send({
            message : "User Record Updated Successfully !"
        })
    }catch(err){
        console.log(err);
        res.status(500).send({
            message : "Internal Server Error while updating !"
        })
    }
}

module.exports = { findAllUsers , findUserByID , updateUser }