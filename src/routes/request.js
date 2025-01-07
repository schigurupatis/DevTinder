const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth.js");
const ConnectionRequestModel = require("../models/connectionRequest.js");
const UserModel = require("../models/user.js")



// Sending Connection Request
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    const user = req.user;
    // Sending a connection request
    console.log("Sending a connection request");
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;


        const allowedStatus = ["ignored", "interested"];
        //Validations
        if(!allowedStatus.includes(status)) {
            return res.status(400).json({message: "Invalid status type: " + status });
        }

        const toUser = await UserModel.findById(toUserId);
        if(!toUser) {
            return res.status(404).json({message: "User not found!"})
        }

        //checking if there is an existing connection request
        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or: [
                {
                    fromUserId,
                    toUserId,
                },
                {
                    fromUserId: toUserId,
                    toUserId: fromUserId,
                },
            ]
        });
        if(existingConnectionRequest) {
            return res
                .status(400)
                .send({
                    message: "Connection Request Already Exists!!"
                })
        }



        //making connection request
        const connectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status,
        });


        const data = await connectionRequest.save();

        res.json({
            message: ` ${req.user.firstName} is ${status} in ${toUser.firstName}`,
            data,  
        })


    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
    //res.send(user.firstName + " sent a connection request");
})

// Sending Review Request
requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        const { status, reqestId } = req.params.status;

        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Status not allowed!"})
        }


        // validate the status
        const connectionRequest = await ConnectionRequest.findOne({
            _id: reqestId,
            toUserId: loggedInUser._id,
            status: "interested"
        })
        if(!connectionRequest) {
            return res.status(400).json({ message: "Connection request not found" })
        }
        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.json({ message: "Connection request " + status, data });


        // csk sending connection req to elon
        // loggedInID = toUserID
        // status = interested
        // request Id should be valid



    } catch(err) {
        res.status(400).send("ERROR: ", err.message);
    }
})

module.exports = requestRouter;
