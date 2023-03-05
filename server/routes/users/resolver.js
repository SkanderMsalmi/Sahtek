const {Patient,Therapist} = require('../../database/models/User');
const {ApolloError} = require('apollo-server-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {key} = require('../../keys');

const resolvers = {

    // Query: {
    //     getPatientFiles:async ()=>{
    //         return await PatientFile.find();
    //     },
    //     getPatientFile:async(_, args)=>{
    //         return await PatientFile.findById(args.id);
    //     }
    // },

    Mutation:{
        registerPatient: async (parent, args) => {
            const password = await bcrypt.hash(args.patientInput.password, 10);
            const patient = new Patient({...args.patientInput,password});
            return await patient.save();
          },
          registerTherapist: async (parent, args) => {
            const password = await bcrypt.hash(args.therapistInput.password, 10);
            const therapist = new Therapist({ ...args.therapistInput, password });
            return await therapist.save();
          },
          async login(parent,{email,password,userType}){
            console.log(email,password,userType);
            let userLogged = null;
            if(userType == 'Patient'){
                userLogged  = await Patient.findOne({email})
            }else if(userType == 'Therapist'){
                userLogged = await Therapist.findOne({email});
            }

            if(!userLogged){
                throw new Error('Invalid email or password');
            }
            const matchPassword = bcrypt.compare(password,userLogged.password);
            if(!matchPassword){}

                const token = jwt.sign(
                    {user_id:userLogged._id},
                    key,{
                        expiresIn: 3600*24*30*6,
                        algorithm:'RS256'
                    }
                );
                return {
                    value:token
                }
            }
      
    },
    Query: {   
        async patient(_, {ID}) {
                return await Patient.findById(ID);
        },
        async therapist(_,{ID}){
            return await Therapist.findById(ID);
            
        },
      
      
    },
}

module.exports = resolvers;
   