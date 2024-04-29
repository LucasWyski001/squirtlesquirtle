const { AuthenticationError } = require('apollo-server-express');
const { User, Fountain } = require('../models');
const { signToken } = require('../utils/auth');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });

const resolvers = {
  Query: {
    // GETs all users and their uploaded fountains
    users: async () => {
      return await User.find().populate('fountains');
    },
    // GETs all fountains from database
    fountains: async () => {
      return Fountain.find({});
    },
    fountain: async (parent, { fountainId }) => {
      return Fountain.findOne({ _id: fountainId });
    },
    // GETs context user and uploaded fountains
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('fountains').populate('saved');
      }
      throw new AuthenticationError('You need to be logged in');
    },
  },

  Mutation: {
    // POSTs new User
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // assigns token to logged in user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    // POSTs new Fountain
    addFountain: async (parent, { address, place, city, state , image }, context) => {
      if (context.user) {
        const fountain = await Fountain.create({
          address,
          place,
          city,
          state,
          image: {
            data: fs.readFileSync(path.join(image)),
            contentType: 'image/png'
          },
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { fountains: fountain._id}}
        );

        return fountain;
      }
      throw new AuthenticationError('You need to be logged in');
    },
    saveFountain: async (parent, { fountainId }, context ) => {
      if (context.user) {
        const fountain = await Fountain.findById({ _id: fountainId });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { saved: fountain._id }}
        );
  
        return fountain;
      }
      throw new AuthenticationError('You need to be logged in');
    }
  }
}

module.exports = resolvers;