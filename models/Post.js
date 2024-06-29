const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  thumbnail: {
    type: String,
    default: "/img/theme/light/code-2.jpg",
  },
  video: {
    type: String,
    default: "",
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

mongoose.model("posts", PostSchema);
