const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: { 
    //Stores the temporary token associated with the password-reset request.
    type: String, 
  }, 
  resetPasswordExpires: { 
    //Stores when that token should stop working.
    type: Date, 
  },
  },
  //timestamps: true is a Mongoose option that automatically adds two fields to every object
  // createdAt
  // updatedAt
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;