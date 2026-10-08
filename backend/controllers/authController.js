const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");//build in Node library

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password we are using bcrypt library here 
    // if user enters 1234 it will save as $2b$10$8K........
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 2. Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 3. Create JWT token
    //jwt.sign creates the authentication token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // 4. Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Generate random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Save token and expiry in database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save();

    // Temporary: show reset link in terminal
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    console.log("Password Reset Link:", resetLink);

    res.status(200).json({
      message: "Password reset link generated",
      resetLink,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    user.password = hashedPassword;

    // Remove reset token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getProfile,
  forgotPassword,
  resetPassword,
};