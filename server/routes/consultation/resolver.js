const Consultation = require("../../database/models/consultation");
const Feedback = require("../../database/models/feedback");
const PatientFile = require("../../database/models/patientFile");

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
        feedback:async (parent)=>{
            return await Feedback.findOne({consultation:parent._id});
        },
        patientFile:async (parent)=>{
            return await PatientFile.findOne({consultation:parent._id});
        }
    }
}

module.exports = resolvers;