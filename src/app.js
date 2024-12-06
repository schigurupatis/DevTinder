const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middleware/auth")

// Handle Auth Middleware for all GET, POST, PATCH, DELETE ... requests
app.use("/admin", adminAuth );
app.use("/user", userAuth);

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