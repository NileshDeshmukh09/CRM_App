/**
 * This file will act as the route for authentication and Authorization.
 */

const  authController = require("../controllers/authController");

// Define the Routes - REST endpoints for userResgistration

module.exports = (app) =>{

    // POST  - 127.0.0.8080/crm/api/v1/auth/signup
    app.post("crm/api/v1/auth/signup" , authController.sign)
}