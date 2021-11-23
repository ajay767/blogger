const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog must have title"],
    },
    description: {
      type: String,
      required: [true, "Blog must have description"],
    },
    poster: {
      type: String,
      required: [true, "Blog must have poster"],
    },
    body: {
      type: String,
      required: [true, "Blog must have body"],
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
