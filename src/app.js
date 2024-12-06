const express = require("express");

const app = express();

app.get("/admin/getAllData", (req, res)=> {
    res.send("All Data Sent")
})

app.get("/admin/deleteUser", (req, res)=> {
    res.send("Delete User")
})

app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777...");
});