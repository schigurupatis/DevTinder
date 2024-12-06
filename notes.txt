const express = require("express");

const app = express();


// This will only handle GET call to /user
// app.get("/user", (req, res) => {
//     console.log(req.query)
//     res.send({
//         firstName: "Santha Kumar",
//         lastName: "Chigurupati"
//     })
// })


// This for dynamic router with changing ID Number
// app.get("/user/:userId", (req, res) => {
//     console.log(req.params)
//     res.send({
//         firstName: "Santha Kumar",
//         lastName: "Chigurupati"
//     })
// })

// ? in the route path makes the preceding character optional
// app.get("/user/ab?cd", (req, res) => {
//     console.log(req.params)
//     res.send({
//         firstName: "Santha Kumar",
//         lastName: "Chigurupati"
//     })
// })

// + in the route path means the preceding character must occur one or more times. matches atleast 1 b or more
// app.get("/user/ab+cd", (req, res) => {
//     console.log(req.params)
//     res.send({
//         firstName: "Santha Kumar",
//         lastName: "Chigurupati"
//     })
// })

// * (wildcard) matches zero or more characters in the path at the specified position. matches any string, number in between ab and cd
// app.get("/user/ab*cd", (req, res) => {
//     console.log(req.params)
//     res.send({
//         firstName: "Santha Kumar",
//         lastName: "Chigurupati"
//     })
// })

// this matches, it works if b exists or not
// app.get("/user/a(bb)?cd", (req, res) => {
//     console.log(req.params)
//     res.send({
//         firstName: "Santha Kumar",
//         lastName: "Chigurupati"
//     })
// })

// this matches, it won't works if at least bb exists
// app.get("/user/a(bb)+cd", (req, res) => {
//     console.log(req.params)
//     res.send({
//         firstName: "Santha Kumar",
//         lastName: "Chigurupati"
//     })
// })

// this matches, regular expression, we can have anything in that route
app.get("/*/", (req, res) => {
    console.log(req.params)
    res.send({
        firstName: "Santha Kumar",
        lastName: "Chigurupati"
    })
})






// app.post("/user", (req, res) => {
//     res.send("Saving data to DataBase");
// })

// app.delete("/user", (req, res) => {
//     res.send("User Deleted Successfully");
// })


// This route will match all the HTTP method API calls to /test
// app.use("/test", (req, res) => {
//     res.send("Hello from the Test page");
// });

// app.use("/login", (req, res) => {
//     res.send("Hello from the Login page");
// });

// app.use("/dashboard", (req, res) => {
//     res.send("Hello from the Dashboard page");
// });

// app.use("/", (req, res) => {
//     res.send("Hello from the Home page: csk");
// });

app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777...")
});