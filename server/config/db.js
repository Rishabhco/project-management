const mongoose = require("mongoose");


const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("You must provide a MongoLab URI");
}

const connectDb = async () => {
    const conn = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDb;