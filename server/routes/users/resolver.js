const {Patient,Therapist} = require('../../database/models/User');
const {ApolloError} = require('apollo-server-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {key,keyPub} = require('../../keys');
const { setCookie } = require('./utils/cookies');
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
          async login(parent,{email,password,userType},{res}){
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
            const matchPassword = bcrypt.compareSync(password,userLogged.password);
            if(matchPassword){
                const token = jwt.sign(
                    {user_id:userLogged._id},
                    key,{
                        expiresIn: 3600*24*30*6,
                        algorithm:'RS256'
                    }
                );
                res.cookie('token',token,{httpOnly:true});
               return "sucess";
            }
            return "failed";
              

              
            }

           
      
    },
    Query: {   
        async patient(_, {ID}) {
                return await Patient.findById(ID);
        },
        async therapist(_,{ID}){
            return await Therapist.findById(ID);
            
        },
        async getCurrectUser(_,{},{req,res}){
            const token = req.cookies.token;
    if(token){
        try {
            const decodedToken = jwt.verify(token,keyPub,{algorithms:['RS256']});
            const user = await Patient.findById(decodedToken.sub).select('-password -__v').exec();
            return user;
            if(decodedToken){
                const user = await Patient.findById(decodedToken.sub).select('-password -__v').exec();
                console.log(user);
                if(user){
                   return user
                }else{
                   return null;
                }
            }else{
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    } else{
        
        return null;
    }
        }
      
      
    },
}

module.exports = resolvers;
   