const { ApolloError } = require("apollo-server-express");
const Consultation = require("../../database/models/consultation");
const Feedback = require("../../database/models/feedback");
const { User } = require("../../database/models/User");
const resolvers = {
  Query: {
    getFeedbacks: async () => {
      return await Feedback.find();
    },
    getFeedback: async (_, args) => {
      return await Feedback.findById(args.id);
    },
  },
  Mutation: {
    createFeedback: async (_, args) => {
      const feedback = Feedback.find({
        patient: args.patient,
        therapist: args.therapist,
      });
      if (feedback) {
        throw new ApolloError(
          "You Already made a feedback for this therapist ! if you want update your feedback go to your feedback"
        );
      }
      const therapist = User.findById(args.therapist);
      const patient = User.findById(args.patient);
      if (!therapist || !patient) {
        throw new ApolloError("Therapist or Patient Doesn't exist");
      }
      if (therapist && patient) {
        return await Feedback.create(args);
      }
    },
    updateFeedback: async (_, args) => {
      return await Feedback.updateOne(args);
    },
    deleteFeedback: async (_, args) => {
      return await Feedback.deleteOne(args);
    },
  },
};

module.exports = resolvers;
