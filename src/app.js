const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")


// Creating a new instance of the User Model
app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "Santha Kumar",
        lastName: "Chigurupati",
        emailId: "schigurupatis@gmail.com",
        password: "test@123",
    })

    await user.save();
    res.send("User Added Successfully");

})

// Connecting to DataBase & Listening the Server
connectDB()
    .then(() => {
        console.log("Database connection success");

        app.listen(7777, () => {
            console.log("Server is successfully listening on port 7777...");
        });

    }).catch((err) => {
        console.log("Database connection failed")
    })

