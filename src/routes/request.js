const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth.js");
const ConnectionRequestModel = require("../models/connectionRequest.js");



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

        //checking if there is an existing connection request
        const existingConnectionRequest = await ConnectionRequest.findOne({
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
        const ConnectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status,
        });


        const data = await ConnectionRequest.save();

        res.json({
            message: "Connection Request Sent Successfully",
            data,  
        })


    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
    //res.send(user.firstName + " sent a connection request");
})

module.exports = requestRouter;
