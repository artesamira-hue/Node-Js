const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //process.env.MONGO_URI "Get the value of MONGO_URI from my environment variables."
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");
  } catch (error) {
    console.log("Database connection failed:", error);
  }
};

module.exports = connectDB;