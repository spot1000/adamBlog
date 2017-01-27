var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title:  String,
  topic : String,
  post:   String,
  author: String,
  comments: [{ body: String,
               date: Date
             }],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", blogSchema);
