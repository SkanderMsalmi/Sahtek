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
    checkFeedbackForPatientAndTherapist: async (_, args) => {
      const feedback = await Feedback.findOne({
        patient: args.patient,
        therapist: args.therapist,
      });

      if (feedback) {
        const therapist = await User.findById(args.therapist);

        return { feedback, therapist };
      } else {
        return null;
      }
    },
  },
  Mutation: {
    createFeedback: async (_, args) => {
      const feedback = await Feedback.findOne({
        patient: args.patient,
        therapist: args.therapist,
      });

      if (feedback) {
        throw new ApolloError(
          "You Already made a feedback for this therapist ! if you want update your feedback go to your feedbacks in your profile"
        );
      }
      const therapist = await User.findById(args.therapist);
      const patient = await User.findById(args.patient);
      if (!therapist || !patient) {
        throw new ApolloError("Therapist or Patient Doesn't exist");
      } else if (!patient.get("patient")) {
        throw new ApolloError("This feature is disabled for Therapists");
      } else if (!therapist.get("therapist")) {
        throw new ApolloError("You can't make a feedback on Patient");
      } else if (therapist && patient) {
        await Feedback.create(args);
        return true;
      }
      return false;
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
