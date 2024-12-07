const mongoose = require("mongoose");

// Schema for User
const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emaiId: {
        type: String
    },
    firstName: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
})


// Model for User
module.exports = mongoose.model("User", userSchema);

