const {Patient,Therapist} = require('../../database/models/User');
const {ApolloError} = require('apollo-server-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {key} = require('../../keys');
const Token = require('../../database/models/verificationToken');
const sendEmail = require('../../utils/sendEmail');
const crypto = require('crypto');

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

            const{email}= args.patientInput;
            const BASE_URL= "http://localhost:5000/";            


            const password = await bcrypt.hash(args.patientInput.password, 10);
            const patient = new Patient({...args.patientInput,password});
             //send email verification

             const token2 = await new Token({
                
                userId: patient.id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();

            // //otp
            // let otp = ''
            // const generateOTP = ()=>{
            //     for(let i =0;i<=3;i++){
            //         const randVal = Math.round(Math.random() * 9)
            //         otp = otp + randVal
            //     }
            //     return otp
            // }
            // const OTP = generateOTP()



            const url = `${BASE_URL}users/${patient.id}/verify/${token2.token}`;
            await sendEmail(patient.email, "Verify your email", String(url));
            
            
            
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
    Query:{
        // patient: (_,{ID})=> Patient.findById(ID),
        // therapist: (_,{ID})=> Therapist.findById(ID)
    }
}

module.exports = resolvers;
   