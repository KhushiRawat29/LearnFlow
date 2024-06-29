const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    default: "",
  },
  displayName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: Number, // 0 -> Creator, 1-> Student
  },
  image: {
    type: String,
    default: "",
  },
  cover: {
    type: String,
    default: "/img/theme/light/code-1.jpg",
  },
  gender: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
  birthdate: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "+91 1234567890",
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

mongoose.model("users", UserSchema);
