var express = require('express');
var router = express.Router();
var path = require('path');
var Post = require("../models/posts")
var mongoose = require('mongoose');
var mongo = require('mongodb');


mongoose.connect(process.env.URLS)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/post', function(req, res, next) {
  res.render('post', { title: 'Express' });
});

router.post('/makePost', function(req,res,next) {
  var title = req.body.title;
  var topic = req.body.topic;
  var post = req.body.post;
  var author = req.body.author;
  console.log(title)
  console.log(topic)
  console.log(post)
  console.log(author)


    var newPost = new Post({
    title : title,
    topic : topic,
    post: post,
    author : author,
  });
  newPost.save(function(err, post){
      if(err) throw err;
      console.log(err);
      console.log(post);
    });
  res.redirect('/')

})

module.exports = router;
