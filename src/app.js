const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const cors = require("cors")

require("dotenv").config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser())


// Creating a new instance of the User Model - POST
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");



app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


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

    //res.send("All users data");
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
    //console.log(req.body)
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
// connectDB()
//     .then(() => {
//         console.log("Database connection success");

//         app.listen(7777, () => {
//             console.log("Server is successfully listening on port 7777...");
//         });

//     }).catch((err) => {
//         console.log("Database connection failed");
//     })


connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(process.env.PORT, () => {
      console.log("Database is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });

