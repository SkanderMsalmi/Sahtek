const { ApolloError } = require("apollo-server-express");
const Rating = require("../../database/models/rating");
const { User } = require("../../database/models/User");
const resolvers = {
  Query: {
    getRating: async (_, args) => {
      return await Rating.findById(args.id);
    },
  },
  Mutation: {
    makeRating: async (_, args) => {
      try {
        if (args.rating > 5) {
          throw new ApolloError("The Rate between 1 and 5");
        }
        let existingRating;
        existingRating = await Rating.findOne({
          therapist: args.therapist,
          patient: args.patient,
        });
        if (existingRating) {
          throw new ApolloError("You have already rated this therapist.");
        }

        const therapist = await User.findById(args.therapist);
        let newRating;
        if (therapist) {
          newRating = new Rating(args);
          await newRating.save();
          therapist.therapist.ratings.push(args.rating);

          await therapist.save();
        } else {
          throw new ApolloError("Therapist doesn't exist");
        }

        return newRating;
      } catch (error) {
        throw new ApolloError(error);
      }
    },

    deleteRating: async (_, args) => {
      return await Rating.deleteOne(args);
    },
  },
};

module.exports = resolvers;
