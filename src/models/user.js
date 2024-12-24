const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const validator = require("validator")
const bcrypt = require("bcrypt")

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
        enum: {
            values: ["male", "female", "others"],
            message: `{VALUE} is not a valid gender type`
        },
        // validate(value) {
        //     if(!["male", "female", "others"].includes(value)) {
        //         throw new Error("Gender data is not valid")
        //     }
        // },
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


userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
                    expiresIn: "7d", // Token expires in 1 hour
                });

                return token;
}


userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;

    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    )
    return isPasswordValid;
}

// Model for User
module.exports = mongoose.model("User", userSchema);

