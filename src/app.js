const express = require("express");

const app = express();

app.use(
    "/user", 
    (req, res, next)=> {
        //Route Handler
        console.log("Handling the route user 1");
        next()
        res.send("Route Handler 1");
    },
    (req, res) => {
        //Route Handler
        console.log("Handling the route user 2")
        res.send("Route Handler 2");
    }

)

app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777...");
});