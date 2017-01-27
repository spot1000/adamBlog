
// requires
var express = require('express');
var router = express.Router();
var path = require('path');
var Post = require("../models/posts")
var mongoose = require('mongoose');
var mongo = require('mongodb');

require('dotenv').load();

//sets up connection to DB
mongoose.connect(process.env.URLS)

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  /* GET home page. */
  router.get('/', function(req, res, next) {
    Post.find({}).exec(function(err, post) {
      if (err) {
        console.log(err)
      } else {
          res.render('index', { title: 'Express', post : post });
      }
    })
  });

  router.get('/post', function(req, res, next) {
    res.render('post', { title: 'Express' });
  });

  router.post('/makePost', function(req,res,next) {
    var title = req.body.title;
    var topic = req.body.topic;
    var post = req.body.post;
    var author = req.body.author;
    var date = new Date();
    console.log(title)
    console.log(topic)
    console.log(post)
    console.log(author)


      var newPost = new Post({
      title : title,
      topic : topic,
      post: post,
      author : author,
      date : date
    });
    newPost.save(function(err, post){
        if(err) throw err;
        console.log(err);
        console.log(post);
      });
    res.redirect('/')

  })
});

module.exports = router;
