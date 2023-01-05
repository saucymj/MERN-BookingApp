const { User, Blog } = require('../models');

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

module.exports = resolvers;