const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../../models/posts');
const passport = require('passport');
const validatePostInput = require('../../validation/post');

//@route get api/posts/test
//@desc Tests post routes
//@@ access public
router.get('/test',(req,res)=> res.json({msg:'posts works'}));
//@route get api/posts/test
//@route post api/posts/
//@desc create post
//@@ access private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors,isValid} = validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    })
    newPost.save().then(post => res.json(post));
})
module.exports = router;
