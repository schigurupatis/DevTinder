const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")

app.use(express.json());


// Creating a new instance of the User Model
app.post("/signup", async (req, res) => {

    // Adding user statically
    // const user = new User({
    //     firstName: "Rahul2",
    //     lastName: "Dravid",
    //     emailId: "rahuldravid@gmail.com",
    //     password: "rahuldravid@123"
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
        res.send("User Added Successfully")
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }



});


// getting data from DB 
// app.get("/user", (req, res) => {
//     res.send("Getting user data success")
// })

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

