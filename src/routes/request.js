const express = require("express");
const { userAuth } = require("../middleware/auth.js")


const requestRouter = express.Router();

// Sending Connection Request
requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
    const user = req.user;
    // Sending a connection request
    console.log("Sending a connection request");

    res.send(user.firstName + " sent a connection request");
})

module.exports = requestRouter;
