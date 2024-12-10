const mongoose = require("mongoose");

// Schema for User
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    emaiId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String
    },
    password: {
        type: String,
        required: true,
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

