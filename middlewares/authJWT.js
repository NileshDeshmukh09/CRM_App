const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const User = require("../models/user.model");
const constants = require("../utils/constants");
/**
 * Authentication
 *     
 *      - If the token passed is valid or Not
 * 
 *  1. If no token is passwed in the userheader - Not Allowed 
 *  2. If token is passed : Authenticated
 *         if correct allow , else reject
 */

function verifyToken(req, res , next){

    /**
     * Read the token from the Header
     */
    const token = req.headers["x-access-token"];

    if( !token ){
        return res.status(403).send({
            message : "No token Provided"
        })
    }

    // If the Token was provided , we need to verify it
    jwt.verify(token, config.secret , (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message : "UnAuthorised"
            });
        }

        // I will try to read the UserID from the decoded token and store it in req object
        req.userId = decoded.id;
        next();

    })
};

/**
 * If the passed Access token is of ADMIN or Not
 */
async function isAdmin(req, res , next){
    /**
     * Fetch the user from the DB using the userID
     */
    const user =await User.findOne({ userId : req.userId});

    /**
     * Check whhat is the UserType
     */
    

    if(user && user.userType === constants.userTypes.admin){
        console.log("This is ADMIN User !");
        next();
    }else{
        res.status(403).send({
            message : "Require ADMIN Role",
        })
    }

}

const authJWT = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
}

module.exports = authJWT;