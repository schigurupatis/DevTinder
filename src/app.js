const express = require("express");
const connectDB = require("./config/database")

const app = express();

connectDB()
    .then(() => {
        console.log("Database connection success");

        app.listen(7777, () => {
            console.log("Server is successfully listening on port 7777...");
        });
        
    }).catch((err) => {
        console.log("Database connection failed")
    })

