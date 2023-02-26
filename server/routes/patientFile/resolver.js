const PatientFile = require("../../database/models/patientFile");

const resolvers = {
    Query: {
        getPatientFiles:async ()=>{
            return await PatientFile.find();
        },
        getPatientFile:async(_, args)=>{
            return await PatientFile.findById(args.id);
        }
    },
    Mutation: {
        createPatientFile:async(_, args)=>{
            return await PatientFile.create(args);
        },
        updatePatientFile:async(_, args)=>{
            return await PatientFile.updateOne(args);
        },
        deletePatientFile:async(_, args)=>{
            return await PatientFile.deleteOne(args);
        }
    }
}

module.exports = resolvers;