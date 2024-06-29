const { Router } = require("express");
const mongoose = require("mongoose");
const moment = require("moment");

const { ensureAuth } = require("../middleware/auth");
const { ensureSignUp, ensureCreator } = require("../middleware/user");

const Post = mongoose.model("posts");
const User = mongoose.model("users");
const Comment = mongoose.model("comments");

const router = new Router();

router.get("/create", ensureAuth, ensureSignUp, ensureCreator, (req, res) => {
  const user = req.user;

  res.locals.user = user;
  res.render("create-post");
});

router.post(
  "/create",
  ensureAuth,
  ensureSignUp,
  ensureCreator,
  async (req, res) => {
    try {
      // Logic to Create Post

      const post = await Post.create({
        ...req.body,
        userId: req.user._id,
      });

      console.log(post);

      res.status(201).send({
        id: post._id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "Something went wrong",
      });
    }
  }
);

router.get("/view/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      res.redirect("/post-not-found");
    }
    const userId = post.userId;

    const author = await User.findById(userId);

    const postDate = moment(post.createdAt).format("dddd, MMMM Do YYYY");

    const commentList = await Comment.find({ postId, depth: 1 });

    res.locals.user = req.user;
    res.locals.postDate = postDate;
    res.locals.author = author;
    res.locals.post = post;
    res.locals.commentList = commentList;

    res.render("post");
  } catch (error) {
    console.log(error);
    res.redirect("/internal-server-error");
  }
});

module.exports = router;
