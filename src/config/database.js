const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://schigurupatis:FNwYaNkBi5jNF7oT@schigurupatis.qlawi.mongodb.net/"
    );
}

connectDB()
    .then(() => {
        console.log("Database connection success")
    }).catch((err) => {
        console.log("Database connection failed")
    })

//mongoose.connect()