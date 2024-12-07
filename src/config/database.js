const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://schigurupatis:FNwYaNkBi5jNF7oT@schigurupatis.qlawi.mongodb.net/"
    );
}

module.exports = connectDB;

