const Consultation = require("../../database/models/consultation");
const PatientFile = require("../../database/models/patientFile");
const { User } = require("../../database/models/User");

const resolvers = {
    Query: {
        getPatientFiles: async () => {
            return await PatientFile.find();
        },
        getPatientFile: async (_, args) => {
            return await PatientFile.findById(args.id);
        },
        getPatientsByTherapist: async (_, { id }) => {
             const list = await PatientFile.find({ therapist: id }).distinct("patient");
             return await User.find({ _id: {$in : list}}); 
         
        },
        getFilesByPatient: async (_, { id }) => {
            return await PatientFile.find({ patient: id });
        },
    },
    Mutation: {
        // createPatientFile: async (_, args) => {
        //     return await PatientFile.create(args);
        // },
        createPatientFile: async (_, {title,remarks,patient ,therapist}) => {
            const createFile = new PatientFile({
                title: title,
                remarks: remarks,
                patient: patient,
                therapist: therapist,
                createdAt: new Date().toDateString(),

            });
            return await createFile.save();
        },
        updatePatientFile: async (_, args) => {
            return await PatientFile.updateOne(args);
        },
        deletePatientFile: async (_, args) => {
            return await PatientFile.deleteOne(args);
        }
    },
    PatientFile: {
        // consultation: async (parent) => {
        //     return await Consultation.findById(parent.consultation);
        // },
        therapist: async (parent) => {
            return await User.findById(parent.therapist);
        },
        patient: async (parent) => {
            return await User.findById(parent.patient);
        }
    }
}

module.exports = resolvers;