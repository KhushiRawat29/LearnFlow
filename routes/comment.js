const { Router } = require("express");
const mongoose = require("mongoose");

const router = new Router();

const { ensureAuth } = require("../middleware/auth");
const Comment = mongoose.model("comments");

router.post("/create", ensureAuth, async (req, res) => {
  try {
    const author = req.user;

    const comment = await Comment.create({
      ...req.body,
      author: author.displayName,
      authorImage: author.image,
    });

    console.log(comment);
    res.status(201).send(comment);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Something went wrong",
    });
  }
});

router.get("/fetch/reply", ensureAuth, async (req, res) => {
  try {
    const { parentId, parentDepth } = req.query;
    if (!parentId || !parentDepth)
      return res.status(400).send({
        error: "Parent ID or Parent Depth is missing",
      });
    const replyList = await Comment.find({
      parentId: parentId,
      depth: Number(parentDepth) + 1,
    });
    res.status(200).send({
      replyList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Something went wrong",
    });
  }
});

module.exports = router;
