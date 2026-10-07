const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connectDB");

const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

//dotenv.config() loads environment variables from the .env file into process.env
dotenv.config();
connectDB()

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/auth", authRoutes);

app.listen(8000, () => {
    console.log("Server running on port 8000");
});