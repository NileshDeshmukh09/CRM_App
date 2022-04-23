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

  /**
    * GET - 127.0.0.1:8080/crm/api/v1/users/{userid}
  */
  app.get("/crm/api/v1/users/:userId", [authJWT.verifyToken], userController.findUserByID )
  
  /**
    * PUT - 127.0.0.1:8080/crm/api/v1/users/{userId}
  */
  app.put("/crm/api/v1/users/:userId", [authJWT.verifyToken , authJWT.isAdmin], userController.updateUser )
  
   
}