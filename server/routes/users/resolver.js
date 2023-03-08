const {Patient,Therapist,User} = require('../../database/models/User');
const {ApolloError} = require('apollo-server-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {key,keyPub} = require('../../keys');
const { setCookie } = require('./cookies');
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
            const {email,password,name,dateOfBirth,gender,role,
            address,phoneNumber,emergencyContact,medicalConditions,medications
            } = args.patientInput;

            const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User with that email already exists');
    }
    const passwordHashed = await bcrypt.hashSync(password, 10);
    
    const user = new User({email,password:passwordHashed,role,patient:{
        name,dateOfBirth,gender,address,phoneNumber,emergencyContact,medicalConditions,medications,
      }});
    
    await user.save();



    return user;
         
          },
          registerTherapist: async (parent, args) => {
            const {email,password,name,dateOfBirth,gender,role,
                license,specialty,description,availability,education,
                experience,languages,fees
                } = args.therapistInput;
    
                const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User with that email already exists');
        }
        const passwordHashed = await bcrypt.hashSync(password, 10);

    
        const user = new User({email,password:passwordHashed,role,therapist:{
            name,dateOfBirth,gender,license,specialty,description,availability,education,
            experience,languages,fees,
        }});
        
        await user.save();
    
     
    
    
        return user;
          },
          async login(parent,{email,password},{res}){
            let userLogged = await User.findOne({email});
            

        //     if(!userLogged){
        //         throw new Error('Invalid email or password');
        //     }
           
            if(userLogged && bcrypt.compareSync(password,userLogged.password)){
                const token = jwt.sign(
                    {},
                    key,{
                        subject:userLogged._id.toString(),
                        algorithm:'RS256',
                        expiresIn:60*60*60*30 *6
                    }
                    );
           return  {
            token,email:userLogged.email,role:userLogged.role
           }
                }
            return "failed";
              

              
        //     }

           
            }  
    },
    Query: {   
        async user(_, {ID}) {
            return await User.findById(ID)
        },
    //     async therapist(_,{ID}){
    //         return await Therapist.findById(ID);
            
        },
    //     async getCurrectUser(_,{},{req}){
    //         const token = req.cookies.token;
    // if(token){
    //     try {
    //         const decodedToken = jwt.verify(token,keyPub,{algorithms:['RS256']});
    //         if(decodedToken){
    //             const user = await Patient.findById(decodedToken.sub).select('-password -__v').exec();
    //             console.log(user);
    //             if(user){
    //                return user
    //             }else{
    //                return null;
    //             }
    //         }else{
    //             return null;
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return null;
    //     }
    // } else{
        
    //     return null;
    // }
    //     }
      
    
    }

module.exports = resolvers;
   