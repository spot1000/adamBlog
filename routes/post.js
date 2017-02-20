// requires
var express = require('express');
var router = express.Router();
var path = require('path');
var Post = require("../models/posts");
var Topic = require("../models/topics");
var mongoose = require('mongoose');
var mongo = require('mongodb');

router.get('/', function(req, res, next) {
    Post.find({}).sort({'date': -1}).exec(function(err, post) {
        if (err) {
            console.log(err)
        } else {
            res.render('allPosts', {
                title: 'Adam Blog',
                post: post
            });
        }
    });
});

router.get("/writePost", function(req, res, next) {
    Topic.find({}).exec(function(err, topic) {
      if (err) {
          console.log(err)
      } else {
        console.log(topic)
        res.render('writePost', {
                title: "Write a post",
                topic : topic
            });
        }
    });
});

router.get('/:ID', function(req, res, next) {
  Post.findById(req.params.ID).exec(function(err, post) {
    if (err) {
        console.log(err)
    } else {
      console.log(post)
        res.render('singlePost', {
            title: 'hi',
            post: post
        });
    }
  });
});

router.get('/topics/:TOPIC', function(req, res, next) {
  Post.find({"topic" : req.params.TOPIC}).exec(function(err, post) {
    if (err) {
      console.log(err)
    } else {
      console.log(post)
      res.render('allPosts', {
        topic: req.params.TOPIC,
        post : post
      });
    }
  });
});

router.post('/makePost', function(req, res, next) {
    var title = req.body.title;
    var topic = req.body.dropdown;
    var post = req.body.post;
    var author = req.body.author;
    var date = new Date();
    if (req.body.topic) {
      topic = req.body.topic;

      var newTopic = new Topic({
        topic : topic
      });

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

      newTopic.save(function(err, topic) {
        if (err) throw err;
        console.log(err);
        console.log(topic);
      });
    }
    else {
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
    }

    res.redirect('/post/')
});

router.post('/:ID/addComment', function(req,res,next) {
    var body = req.body.comment
    var name = req.body.name
    var date = new Date()
    console.log(body);
    console.log(name)
    console.log(date)

  Post.findByIdAndUpdate(req.params.ID, {"$push": {'comments' : {'body' : req.body.comment, 'name': req.body.name, 'date': new Date()}}
  }, {safe:true, upsert:true, new : true}, function(err, comment) {
    if (err) throw err;
    console.log(comment);
    res.redirect('back')
  });
});

module.exports = router;
