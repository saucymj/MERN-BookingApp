const { AuthenticationError } = require('apollo-server-express');
const { User, Blog } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query:{

    }

    Mutation: {
        
    }
}