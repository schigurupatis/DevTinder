const express = require("express");
const { userAuth } = require("../middleware/auth.js")
const { validateProfileEditData } = require("../utils/validation")


const profileRouter = express.Router();

// Get Profile or Profile View
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {

        const user = req.user;

        // // Access cookies
        // const token = req.cookies["json-token"]; // Ensure cookie name matches
        // if (!token) {
        //     throw new Error("Authentication token not found in cookies.");
        // }

        // // Validate the token
        // const decodedMessage = jwt.verify(token, "DEV@Tinder$790");
        // //console.log("Decoded Token:", decodedMessage);

        // const { _id } = decodedMessage;

        

        res.send(user);
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

// Edit Profile
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        //Data Validation
        if(!validateProfileEditData(req)) {
            throw new Error("Invalid Edit Request");
            //return res.status(400).send("")
        }

        const loggedInUser = req.user;
        //console.log(loggedInUser)

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        //console.log(loggedInUser)

        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, your Profile Updated Successfully`,
            data: loggedInUser,
        });

    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
})


module.exports = profileRouter;
