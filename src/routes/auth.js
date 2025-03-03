const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt")

const { validateSignupData } = require("../utils/validation.js")


const authRouter = express.Router();


// Creating a new instance of the User Model - POST
authRouter.post("/signup", async (req, res) => {
    try {
        // 1. Validation of data 
        validateSignupData(req);

        const { firstName, lastName, emailId, password } = req.body;

        // 2. Encrypt the Password
        const passwordHash = bcrypt.hashSync(password, 10);
        //console.log(passwordHash)

        // 3. Store the user instance in DB
        //const user = new User(req.body)
        const user = new User({
            firstName, lastName, emailId, password: passwordHash,
        })
        await user.save();  
        res.send("User Added Successfully")
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }



});


// Login API 
authRouter.post("/login", async (req, res) => {
    try{
        const {emailId, password} = req.body;

        const user = await User.findOne({ emailId});
        if(!user) {
            throw new Error("Invalid Credentials")
        }

        const isPasswordValid = await user.validatePassword

        if(isPasswordValid) {
            // Create a JWT Token
            const token = await user.getJWT();
            //console.log("Generated Token:", token);

            // Add the token to cookie and send the response back to the user
            // Add the token to cookie
            res.cookie("json-token", token, {
                httpOnly: true, // Ensures cookie is not accessible via JavaScript
                secure: false, // Set to true if using HTTPS
                maxAge: 3600000, // Cookie expires in 1 hour (same as token)
            });

            res.send(user)
        } else {
            throw new Error("Invalid Credentials")
        }

    } catch (err) {
        res.status(400).send("ERR: : " + err);
    }
})


// LogOut API
authRouter.post("/logout", async (req, res) => {
    res.cookie("json-token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout Successfully")
})

module.exports = authRouter;