const express = require("express");

const app = express();

app.use(
    "/user", 
    [
        (req, res, next)=> {
            //Route Handler
            console.log("Handling the route user 1");
            next()
            res.send("Route Handler 1");
        },
        (req, res, next) => {
            //Route Handler
            console.log("Handling the route user 2")
            next();
            res.send("Route Handler 2");
        },
        (req, res, next) => {
            //Route Handler
            console.log("Handling the route user 3")
            next();
            //res.send("Route Handler 3");
        }
    ]

)

app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777...");
});