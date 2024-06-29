const { Router } = require("express");
const mongoose = require("mongoose");

const User = mongoose.model("users");
const Post = mongoose.model("posts");

const { ensureAuth, ensureGuest } = require("../middleware/auth");
const { ensureSignUp, ensureNewUser } = require("../middleware/user");

const router = new Router();

router.get("/", ensureGuest, (req, res) => {
  res.render("login");
});

router.get("/signup", ensureAuth, ensureNewUser, (req, res) => {
  res.render("signup");
});

router.patch(
  "/user/update/role",
  ensureAuth,
  ensureNewUser,
  async (req, res) => {
    try {
      const { role } = req.body;
      const user = req.user;
      user.role = Number(role);
      await user.save();
      res.status(200).send({});
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "Something went wrong",
      });
    }
  }
);

router.get("/dashboard", ensureAuth, ensureSignUp, async (req, res) => {
  try {
    const posts = await Post.find({});

    res.locals.user = req.user;
    res.locals.posts = posts;
    res.render("dashboard");
  } catch (error) {
    console.log(error);
    res.redirec("/internal-server-error");
  }
});

module.exports = router;
