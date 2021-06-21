const mongoose = require("mongoose");

const Post = mongoose.model(
  "post",
  new mongoose.Schema({
    authorId: { type: String },
	title: { type: String },
	published: { type: Date, default: Date.now },
    content:{ type: String }
  })
);

module.exports = Post;