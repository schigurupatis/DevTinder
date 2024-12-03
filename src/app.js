const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello from the Home page: csk");
});

app.get("/login", (req, res) => {
    res.send("Hello from the Login page");
});

app.get("/dashboard", (req, res) => {
    res.send("Hello from the Dashboard page");
});

app.listen(7777, () => {
    console.log("Server is successfully listening on port 6000...")
});