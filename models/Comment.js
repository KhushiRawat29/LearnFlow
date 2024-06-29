const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorImage: {
    type: String,
    default: "",
  },
  commentText: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
    default: null,
  },
  depth: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

mongoose.model("comments", CommentSchema);
