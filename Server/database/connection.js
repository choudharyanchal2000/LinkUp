require('dotenv').config()
const mongoose = require('mongoose')

const URI = process.env.MONGO_URL;

const connectDb = async () => {
    try {
        await mongoose.connect(URI)
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("connection failed" + error)
        process.exit(0)
    }
}

module.exports = connectDb  