const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Profile = require('../../models/profile');
const User = require('../../models/user');

router.get('/test',(req,res)=> res.json({msg:'profile works'}));

//@route get api/profile/
//@desc return profile
//@@ access private

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const errors ={};
    Profile.findOne({user: req.user.id})
            .then(profile =>{
                if(!profile){
                    errors.noprofile = 'no profile found';
                    return res.status(404).json(errors);
                    
                }
                res.json(profile);
            })
            .catch(error => console.log(error));
})

module.exports = router;
