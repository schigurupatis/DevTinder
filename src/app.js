const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")

app.use(express.json());


// Creating a new instance of the User Model
app.post("/signup", async (req, res) => {

    // Adding user statically
    // const user = new User({
    //     firstName: "Deepika",
    //     lastName: "Padukone",
    //     emailId: "deepikapadukone@gmail.com",
    //     password: "deepikapadukone@123"
    // })

    // try {
    //     await user.save();
    //     res.send("Usere Added Successfully")
    // } catch (err) {
    //     res.status(400).send("Error saving the user:" + err.message);
    // }



    // Adding user Dynamically
    //console.log(req.body);
    const user = new User(req.body)

    try {
        await user.save();
        res.send("Usere Added Successfully")
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }



})

//Connecting to DataBase & Listening the Server
connectDB()
    .then(() => {
        console.log("Database connection success");

        app.listen(7777, () => {
            console.log("Server is successfully listening on port 7777...");
        });

    }).catch((err) => {
        console.log("Database connection failed")
    })

