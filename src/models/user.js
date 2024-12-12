const mongoose = require("mongoose");

// Schema for User
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    firstName: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid")
            }
        },
    },
    photoURL: {
        type: String,
        default: "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png",
    },
    about: {
        type: String,
        default: "This is default about description of user",
    },
    skills: [String],
})


// Model for User
module.exports = mongoose.model("User", userSchema);

