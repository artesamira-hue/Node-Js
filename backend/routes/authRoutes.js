const express = require("express");

const { registerUser, loginUser, getProfile } = require("../controllers/authController");
const {authMiddleware} = require("../middlewear/authMiddlewear")

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser)
router.get("/profile", authMiddleware, getProfile);

module.exports = router;