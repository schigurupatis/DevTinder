const express = require("express");
const { userAuth } = require("../middleware/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get all the pending connection requests for the loggedin user
userRouter.get("/user/requests/received", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", USER_SAFE_DATA);

        res.json({
            message: "Data Fetched Successfully",
            data: connectionRequests,
        })

    } catch(err) { 
        req.statusCode(400).send("ERROR: " + err.message);
    }

});

// Get all the received(accepted) connection requests for the loggedin user
userRouter.get("/user/connections", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {
                    toUserId: loggedInUser._id,
                    status: "accepted",
                },
                {
                    fromUserId: loggedInUser._id,
                    status: "accepted",
                },
            ],
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequests.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId
        });
        
        res.json({ data });

    } catch(err) { 
        req.status(400).send({ message: err.message});
    }

});




module.exports = userRouter;