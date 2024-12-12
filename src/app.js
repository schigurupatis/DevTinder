const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation.js")
const bcrypt = require("bcrypt")

app.use(express.json());


// Creating a new instance of the User Model - POST
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
    try{
        const {emailId, password} = req.body;

        const user = await User.findOne({ emailId: emailId});
        if(!user) {
            throw new Error("EmailID is not in our DB or invalid EmailID")
        }

        const isPasswordValid = await bcrypt.compareSync(password, user.password)

        if(isPasswordValid) {
            res.send("Login successfully")
        } else {
            throw new Error("Password is not correct")
        }

    } catch (err) {
        res.status(400).send("ERR: : " + err);
    }
})


// getting data from DB - GET
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        const users = await User.find({emailId: userEmail});
        //const users = await User.findOne({emailId: userEmail});
        if(users.length === 0) {
            res.status(404).send("Users not found")
        } else {
            res.send(users);
        }
    } catch (err) {
        res.status(400).send("User Not Found")
    }
    
})

// getting all users data - GET
app.get("/feed", async (req, res) => {
    try{
        const usersData = await User.find({});
        res.send(usersData)
    } catch(err) {
        res.status(404).send("something went wrong")
    }

    res.send("All users data");
})

// deleting user data - DELETE
app.delete("/user", async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully");
    } catch (err) {
        res.status(404).send("user not found")
    }
})

// update user data - PATCH or UPDATE
app.patch("/user", async (req, res) => {
    console.log(req.body)
    const userId = req.body.userId;
    const data = req.body;
    try {
        await User.findByIdAndUpdate({ _id: userId }, data)
        res.send("user updated successfully")
    } catch (err) {
        res.status(404).send("User not found")
    }
})


// updating data in DB - PATCH
//app.patch("/user", (req, res) => {
    // const userId = req.body.userId;
    // const data = req.body;
    // try {
    //     const user = await User.findByIdAndUpdate({ _id: userId }, data, {
    //         returnDocument: "after",
    //         runValidators: true,
    //     });
    //     console.log(user);
    //     res.send("User updated successfully");
    // } catch (err) { 
    //     res.status(400).send("something went wrong")
    // }

    //res.send("Updated successfully")
//})



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

