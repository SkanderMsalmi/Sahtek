const Feedback = require("../../database/models/feedback");

const resolvers = {
    Query: {
        getFeedbacks:async ()=>{
            return await Feedback.find();
        },
        getFeedback:async(_, args)=>{
            return await Feedback.findById(args.id);
        }
    },
    Mutation: {
        createFeedback:async(_, args)=>{
            return await Feedback.create(args);
        },
        updateFeedback:async(_, args)=>{
            return await Feedback.updateOne(args);
        },
        deleteFeedback:async(_, args)=>{
            return await Feedback.deleteOne(args);
        }
    }
}

module.exports = resolvers;