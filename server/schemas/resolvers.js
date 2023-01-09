const { AuthenticationError } = require('apollo-server-express');
const { User, Blog } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

  Query: {
    users: async () => {
      return await User.find({}).populate('blogs').populate({
      });
    },
    blogs: async () => {
      return await Blog.find({});
    },
  }
};


