const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../../models/posts");
const Profile = require("../../models/profile");
const passport = require("passport");
const validatePostInput = require("../../validation/post");

//@route get api/posts/test
//@desc Tests post routes
//@@ access public
router.get("/test", (req, res) => res.json({ msg: "posts works" }));

//@route get api/posts/
//@desc get post
//@@ access public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.json(err));
});

//@route get api/posts/:id
//@desc get post by id
//@@ access public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.json({ nopost: "no post" }));
});

//@route post api/posts/
//@desc create post
//@@ access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);
//@route delete api/posts/:id
//@desc get post
//@@ access private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            //owner check
            if (post.user.toString() !== req.user.id) {
              return res.status(401).json({ noauthorized: "no authorized" });
            }
            post.remove().then(() => res.json({ success: true }));
          })
          .catch(err => res.status(404).json({ nopost: "no post" }));
      })
      .catch(err => res.json(err));
  }
);

//@route post api/posts/like/:id
//@desc Like post
//@@ access private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length > 0
            ) {
              return res
                .status(400)
                .json({ alreadyliked: "User already liked the post" });
            }
            //add user id to like array
            post.likes.unshift({ user: req.user.id });
            post.save().then(post => res.json(post));
          })
          .catch(err => res.status(404).json({ nopost: "no post" }));
      })
      .catch(err => res.json(err));
  }
);

//@route post api/posts/unlike/:id
//@desc unLike post
//@@ access private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length === 0
            ) {
              return res
                .status(400)
                .json({ noliked: "you have not yet liked the post" });
            }
            //Get remove the index
            const removeIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);

            //splice out array
            post.likes.splice(removeIndex, 1);

            //Save
            post.save().then(post => res.json(post));
          })
          .catch(err => res.status(404).json({ nopost: "no post" }));
      })
      .catch(err => res.json(err));
  }
);

//@route post api/posts/comment/:id
//@desc comment post
//@@ access private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          user: req.user.id,
          avatar: req.body.avatar
        };
        //add to the comments array
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ nopost: "no post" }));
  }
);

//@route post api/posts/comment/:id/:comment_id
//@desc delete comment
//@@ access private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
