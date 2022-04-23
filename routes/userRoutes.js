/**
 * Define the routes for the UserResource
 */

const userController = require("../controllers/user.controller");
const { authJWT } = require("../middlewares")


module.exports = (app) =>{
    
    /**
     * GET - 127.0.0.1:8080/crm/api/v1/users/
    */
   app.get("/crm/api/v1/users",[authJWT.verifyToken , authJWT.isAdmin] , userController.findAllUsers)
}