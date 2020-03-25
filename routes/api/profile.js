const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const Profile = require("../../models/profile");
const User = require("../../models/user");
const validateProfileInput = require("../../validation/profile");

router.get("/test", (req, res) => res.json({ msg: "profile works" }));

//@route get api/profile/
//@desc return profile
//@@ access private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "no profile found";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(error => console.log(error));
  }
);

//@route post api/profile/
//@desc create or edit user profile
//@@ access private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const {errors,isValid} = validateProfileInput(req.body);
    if(!isValid){
      return res.status(400).json(errors);
    }
    //get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubausername)
      profileFields.githubausername = req.body.githubausername;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.website) profileFields.website = req.body.website;
    if (typeof req.body.skills !== "undefined")
      profileFields.skills = req.body.skills.split(",");
    //social fields
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //check handle
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          const errors = {};
          if (profile) {
            errors.handle = "handle already exist";
            res.status(400).json(errors);
          }
        });

        //create

        new Profile(profileFields).save().then(profile => {
          res.json(profile);
        });
      }
    });
  }
);

module.exports = router;
