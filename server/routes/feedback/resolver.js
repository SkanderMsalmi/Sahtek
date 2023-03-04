const Consultation = require("../../database/models/consultation");
const Feedback = require("../../database/models/feedback");

const resolvers = {
    Query: {
        getFeedbacks:async ()=>{
            await Feedback.find().then((feedbacks)=>{console.log(feedbacks[0].consultation._id)})
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
    },
    Feedback: {
        consultation:async (parent, args)=>{
            return await Consultation.findById(parent.consultation);
        }   

    }
}

module.exports = resolvers;