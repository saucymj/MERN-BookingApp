const { AuthenticationError } = require('apollo-server-express');
const { User, Blog } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('blogs');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('blogs');
    },
    blogs: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Blog.find(params).sort({ createdAt: -1 });
    },
    blog: async (parent, { blogID }) => {
      return Blog.findOne({ _id: blogID });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addBlog: async (parent, { blogText, blogAuthor }) => {
      const blog = await Blog.create({ blogText, blogAuthor });

      await User.findOneAndUpdate(
        { username: blogAuthor },
        { $addToSet: { blogs: blog._id } }
      );

      return blog;
    },
    addComment: async (parent, { blogID, commentText, commentAuthor }) => {
      return Blog.findOneAndUpdate(
        { _id: blogID },
        {
          $addToSet: { comments: { commentText, commentAuthor } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeBlog: async (parent, { blogId }) => {
      return Blog.findOneAndDelete({ _id: blogId });
    },
    removeComment: async (parent, { blogId, commentId }) => {
      return Blog.findOneAndUpdate(
        { _id: blogId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;

