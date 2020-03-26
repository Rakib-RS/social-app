const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const Profile = require("../../models/profile");
const User = require("../../models/user");
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

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

//@route post api/profile/handle/:handle
//@desc return proifle by handle
//@@ access public
router.get("/handle/:handle", (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        const errors = {};
        errors.noprofile = "no profile exist";
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(error => console.log(error));
});

//@route post api/profile/user/:user_id
//@desc return proifle by user_id
//@@ access public
router.get("/user/:user_id", (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        const errors = {};
        errors.noprofile = "no profile exist";
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(error =>
      res.status(404).json({ profile: "there are no profile for the user" })
    );
});

//@route post api/profile/all
//@desc return all proifle
//@@ access public
router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        const errors = {};
        errors.noprofile = "no profile exist";
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(error =>
      res.status(404).json({ profile: "there is no profile for the user" })
    );
});

//@route post api/profile/
//@desc create or edit user profile
//@@ access private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
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
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      //add experience
      profile.experience.unshift(newExp);
      profile
        .save()
        .then(profile => {
          res.json(profile);
        })
        .catch(error => {
          res.json(error);
        });
    });
  }
);

  //@router profile/education
  //@desc create education
  //@access private

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      //add experience
      profile.education.unshift(newEdu);
      profile
        .save()
        .then(profile => {
          res.json(profile);
        })
        .catch(error => {
          res.json(error);
        });
    });
  }
);


//@router  delete api/profile/experience
  //@desc delete education
  //@access private

  router.delete(
    "/experience/:exp_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Profile.findOne({user:req.user.id})
              .then(profile =>{
                //get remove index
                const removIndex = profile.experience
                  .map(item => item.id)
                  .indexOf(req.params.exp_id);
                
                  //splice out of array

                  profile.experience.splice(removIndex,1);

                  //save
                  profile.save().then(profile => res.json(profile));


              })
              .catch(error => res.json(error));
              
    }
  );

  //@router  delete api/profile/education/edu_id
  //@desc delete education
  //@access private

  router.delete(
    "/education/:edu_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Profile.findOne({user:req.user.id})
              .then(profile =>{
                //get remove index
                const removIndex = profile.education
                  .map(item => item.id)
                  .indexOf(req.params.exp_id);
                
                  //splice out of array

                  profile.education.splice(removIndex,1);

                  //save
                  profile.save().then(profile => res.json(profile));


              })
              .catch(error => res.json(error));
              
    }
  );

module.exports = router;
