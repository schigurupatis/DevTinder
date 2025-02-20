const express = require("express");
const { userAuth } = require("../middleware/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest")

// Get all the pending connection requests for the loggedin user
userRouter.get("/user/requests/received", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
        });
        res.json({
            message: "Data Fetched Successfully",
            data: connectionRequests,
        })

    } catch(err) {
        req.statusCode(400).send("ERROR: " + err.message);
    }

});

module.exports = userRouter;