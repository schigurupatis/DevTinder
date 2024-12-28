const express = require("express");
const { userAuth } = require("../middleware/auth.js")


const requestRouter = express.Router();

// Sending Connection Request
requestRouter.post("/rquest/send/interested/:toUserId", userAuth, (req, res) => {
    const user = req.user;
    // Sending a connection request
    console.log("Sending a connection request");

    async (req, res) => {
        try{
            const fromUserId = req.user._id;
        } catch (err) {
    
        }
    }


    res.send(user.firstName + " sent a connection request");
})

module.exports = requestRouter;
