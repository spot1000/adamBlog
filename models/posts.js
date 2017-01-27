var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title:  String,
  topic : String,
  author: String,
  body:   String,
  comments: [{ body: String,
               date: Date
             }],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", blogSchema);
