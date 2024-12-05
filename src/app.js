const express = require("express");

const app = express();

app.use("/test", (req, res) => {
    res.send("Hello from the Test page");
});

app.use("/login", (req, res) => {
    res.send("Hello from the Login page");
});

app.use("/dashboard", (req, res) => {
    res.send("Hello from the Dashboard page");
});

app.use("/", (req, res) => {
    res.send("Hello from the Home page: csk");
});

app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777...")
});