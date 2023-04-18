const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/email");
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide Email Address"],
    lowercase: true,
    validate: [validator.isEmail, "Please Provide Valid Email"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 30,
    validate: [
      validator.isStrongPassword,
      "Password Must Contain Atleast one upperCase alphabet,Atleast One LowerCase Alphabet,and Atleast 1 Special Character",
    ],
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords does not match",
    },
  },
});
UserSchema.pre("save", async function (next) {
  await sendEmail({
    email: this.email,
    subject: "Registered",
    message: `Your Email ID is ${this.email} and your Login Password is ${this.password}`,
  });
  next();
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  console.log(this.password);
  next();
});

module.exports = mongoose.model("User", UserSchema);
