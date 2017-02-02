// requires
var express = require('express');
var router = express.Router();
var path = require('path');
var Post = require("../models/posts")
var mongoose = require('mongoose');
var mongo = require('mongodb');

router.get('/', function(req, res, next) {
    Post.find({}).sort({'date': -1}).exec(function(err, post) {
        if (err) {
            console.log(err)
        } else {
            res.render('allPosts', {
                title: 'Express',
                post: post
            });
        }
    });
});

router.get("/writePost", function(req, res, next) {
    res.render('writePost', {
        title: "Write a post"
    });
});

router.get('/:ID', function(req, res, next) {
  Post.findById(req.params.ID).exec(function(err, post) {
    if (err) {
        console.log(err)
    } else {
        res.render('singlePost', {
            title: 'hi',
            post: post
        });
    }
  });
});

router.post('/makePost', function(req, res, next) {
    var title = req.body.title;
    var topic = req.body.topic;
    var post = req.body.post;
    var author = req.body.author;
    var date = new Date();
    var newPost = new Post({
        title: title,
        topic: topic,
        post: post,
        author: author,
        date: date
    });

    newPost.save(function(err, post) {
        if (err) throw err;
        console.log(err);
        console.log(post);
    });

    res.redirect('/post/')
});

router.post('/addComment', function(req,res,next) {
  var comment
})

module.exports = router;
