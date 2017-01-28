
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
    Post.findOne({}).sort({"date":-1}).exec(function(err, post) {
      if (err) {
        console.log(err)
      } else {
          res.render('index', { title: 'Express', post : post });
      }
    })
  });
});

module.exports = router;
