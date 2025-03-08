const express = require("express");
const { userAuth } = require("../middleware/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName photoURL age gender about skills";

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


// // Get all users info (Feed API)
// userRouter.get("/user/feed", userAuth, async(req, res) => {
//     try{
//         // User should see all the user cards except
//         // 0. His own card
//         // 1. His connections
//         // 2. Ignored People
//         // 3. Already sent the connection request
        
//         // Example Elon = [Rashmika, Pooja, Dhone, Kumar, Mark, Trump]
//         // Dont show "already accepted connections" & "already rejected connections"

//         const loggedInUser = req.user;

//         const page = parseInt(req.query.page) || 1;
//         let limit = parseInt(req.query.limit) || 10;
//         limit = limit > 50 ? 50 : limit;
//         const skip = (page - 1) * limit;

//         // Find all connection requests (send + received)
//         const connectionRequests = await ConnectionRequest.find({
//             $or: [
//                 { fromUserId: loggedInUser._id },
//                 { toUserId: loggedInUser._id },
//             ]
//         }).select("fromUserId toUserId");

//         const hideUsersFromFeed = new Set();
//         connectionRequests.forEach((req) => {
//             hideUsersFromFeed.add(req.fromUserId.toHexString());
//             hideUsersFromFeed.add(req.toUserId.toHexString());
//         });

//         const users = await User.find({
//             $and: [
//                 { _id: { $nin: Array.from(hideUsersFromFeed)} },
//                 { _id: { $ne: loggedInUser._id} },
//             ],
//         }).select(USER_SAFE_DATA).skip(skip).limit(limit);

//         //res.send(users);
//         res.json({
//             message: "All Feed Data is",
//             data: users,
//         })

//     } catch(err) {
//         res.status(400).json({message: err.message});
//     }
// });



userRouter.get("/user/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        // Pagination setup
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        // Find all connection requests where the logged-in user is involved
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id },
            ],
            //status: { $in: ["accepted", "rejected", "ignored"] }, // Exclude these statuses
        }).select("fromUserId toUserId");

        // Collect users to hide
        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        // Also hide the logged-in user
        hideUsersFromFeed.add(loggedInUser._id.toString());

        // Fetch users excluding logged-in user and filtered users
        // const users = await User.find({
        //     _id: { $nin: Array.from(hideUsersFromFeed) } // Exclude hidden users
        // })
        // .select(USER_SAFE_DATA)
        // .skip(skip)
        // .limit(limit);
        const users = await User.find({
            $and: [
              { _id: { $nin: Array.from(hideUsersFromFeed) } },
              { _id: { $ne: loggedInUser._id } },
            ],
          })
            .select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit);

        res.json({
            message: "All Feed Data is",
            data: users,
        });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});




module.exports = userRouter;