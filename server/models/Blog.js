const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const blogSchema = new Schema({
  blogText: {
    type: String,
    required: "You need to leave a comment!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  blogAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Blog = model("Blog", blogSchema);

module.exports = Blog;
