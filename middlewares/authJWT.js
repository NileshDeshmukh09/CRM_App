const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
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

const authJWT = {
    verifyToken : verifyToken
}

module.exports = authJWT;