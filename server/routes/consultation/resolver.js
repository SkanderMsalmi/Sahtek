const Consultation = require("../../database/models/consultation");

const resolvers = {
    Query: {
        getConsultations:async ()=>{
            return await Consultation.find();
        },
        getConsultation:async(_, args)=>{
            return await Consultation.findById(args.id);
        }
    },
    Mutation: {
        createConsultation:async(_, args)=>{
            return await Consultation.create(args);
        },
        updateConsultation:async(_, args)=>{
            return await Consultation.updateOne(args);
        },
        deleteConsultation:async(_, args)=>{
            return await Consultation.deleteOne(args);
        }
    },
    Consultation: {
        feedback:async (parent, args)=>{
            return await Feedback.findById(parent.feedback);
        }
    }
}

module.exports = resolvers;