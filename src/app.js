const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middleware/auth")

// Handle Auth Middleware for all GET, POST, PATCH, DELETE ... requests
app.use("/admin", adminAuth );
app.use("/user", userAuth);
app.use("/", (err, req, res, next) => {
    if(err) {
        res.status(500).send("Something Went Wrong")
    }
})

app.get("/user", (req, res) => {
    try {
        throw new Error("aaaaaaa");
        res.send("User data send")
    }
    catch (err) {
        res.status(500).send("Something Went Wrong")
    }
})

app.get("/admin/getAllData", (req, res)=> {
    res.send("All Data Sent");
})

app.get("/admin/deleteUser", (req, res)=> {
    res.send("Delete User");
})

app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777...");
});