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
        const savedUser = await user.save();
        const token = await savedUser.getJWT();

        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),
          });
          res.json({ message: "User Added successfully!", data: savedUser });
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }



});


// Login API 
authRouter.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
  
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        throw new Error("Invalid credentials");
      }
      const isPasswordValid = await user.validatePassword(password);
  
      if (isPasswordValid) {
        const token = await user.getJWT();
  
        res.cookie("json-token", token, {
          expires: new Date(Date.now() + 8 * 3600000),
        });
        res.send(user);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  });


// LogOut API
authRouter.post("/logout", async (req, res) => {
    res.cookie("json-token", null, {
      expires: new Date(Date.now()),
    });
    res.send("Logout Successful!!");
  });


module.exports = authRouter;