const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connectDB");
const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());

connectDB()

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users"
    });
  }
});

app.listen(8000, () => {
    console.log("Server running on port 8000");
});