const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../../models/posts');
const Profile = require('../../models/profile');
const passport = require('passport');
const validatePostInput = require('../../validation/post');

//@route get api/posts/test
//@desc Tests post routes
//@@ access public
router.get('/test',(req,res)=> res.json({msg:'posts works'}));

//@route get api/posts/
//@desc get post
//@@ access public
router.get('/',(req,res) =>{
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err  => res.json(err));
});

//@route get api/posts/:id
//@desc get post by id
//@@ access public
router.get('/:id',(req,res) =>{
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err  => res.json({nopost:'no post'}));
});


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
});
//@route delete api/posts/:id
//@desc get post
//@@ access public
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res) =>{
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post =>{
                    //owner check
                    if(post.user.toString()!==req.user.id){
                        return res.status(401).json({noauthorized: 'no authorized'})
                    }
                    post.remove().then(() => res.json({success:true}))
                })
                .catch(err => res.status(404).json({nopost:'no post'}))
        })
        .catch(err  => res.json(err));
})

module.exports = router;
