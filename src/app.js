const express = require("express");

const app = express();

// Handle Auth Middleware for all GET, POST, PATCH, DELETE ... requests
app.use("/admin", (req, res, next) => {
    //check if the user is authorized or not
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized) {
        res.status(401).send("Not authorized");
    }else {
        next();
    }
});

app.get("/user", (req, res) => {
    res.send("User data send")
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