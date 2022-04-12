/**
 * This file will contain the custom middleware for 
 * varifying the request body
 */

 const User = require("../models/user.model")

 validateSignupRequest = async (req,res, next) =>{
     //Validate if userName exists
     if(!req.body.name){
         return res.status(400).send({
             message : "Failed ! Name is not provided"
         })
     }
 
     //Validate if the userId exists
     if(!req.body.userId){
         return res.status(400).send({
             message : "Failed ! UserID  is not provided"
         })
     }
 
     /**
      * Valiate if the userIs is already not preset
      */
     const user = await User.findOne({userId : req.body.userId});
 
     if(user!=null){
         return res.status(400).send({
             message : "Failed !  User Id already exist"
         })
     }
 
     /**
      * similar validation for all the other fields
      * 
      * email, 
      * password,
      * userType
      */

    /*
        validate the Email if it Exists
    */
     if( !req.body.email ){
        return res.status(400).send({
            message : "Failed ! Email is Not provided !"
        })
    }

    /**
     * Valiate if the userIs is already not preset
     */
    const email = await User.findOne({email : req.body.email});

    if( email!=null ){
        return res.status(400).send({
            message : "Failed !  Email already exist"
        })
    }

    /*
        validate the "userType" if it already Exists
    */

    if( !req.body.userType ){
        return res.status(400).send({
            message : "Failed ! UserType, is Not provided !"
        })
    }

    /*
        validate the "password" if it Exists
    */
        if( !req.body.password ){
            return res.status(400).send({
                message : "Failed ! Password,, is Not provided !"
            })
        }
    


     next(); // give the controll to the controller
 }
 
 module.exports = {
     validateSignUpRequest : validateSignupRequest
 }