const express = require("express");
const { userAuth } = require("../middleware/auth.js")


const profileRouter = express.Router();

// Get Profile
profileRouter.get("/profile", userAuth, async (req, res) => {
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


module.exports = profileRouter;
