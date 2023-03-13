const {Patient,Therapist,User} = require('../../database/models/User');
const {ApolloError} = require('apollo-server-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const {key,keyPub} = require('../../keys');
//const { setCookie } = require('./cookies');
const Token = require('../../database/models/verificationToken');
const sendEmail = require('../../utils/sendEmail');
const crypto = require('crypto');
const user = require('../../schemas/user');

const resolvers = {
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
       
          
     resetPassword :async (parent, args) => {
            const { email } = args;
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                        auth: {
                  user: 'sahtek2023@gmail.com', 
                  pass: 'qrowlwkuavbwonwo' 
                },
              });
          
              
              const user = await User.findOne({ email });
          const secret="ggggg"+user.password
              const payload={
            email: user.email,
            id:user.id,
          }
          const token=jwt.sign(payload,secret+{expiresIn:'15m'})
            const mailOptions = {
              from: 'sahtek2023@gmail.com',
              to: email,
              subject: 'Reset Password Link',
              text: `Please click on the following link to reset your password: http://localhost:3000/resetPassword/${user.id}/${token}`
            ,
            };
            await transporter.sendMail(mailOptions);
            return true;
          },
          resetPasswordlink :async (parent, args) => {
            const { userid,token,newpassword } = args;

            const user = await User.findById(userid );
          // const secret=key+user.password
           
            //const payload=jwt.verify(token,secret)
             user.password= bcrypt.hashSync(newpassword, 10)
             await user.save();
             return true;
           },
           
           
          
          async login(parent,{email,password},{res}){
            let userLogged = await User.findOne({email});
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
            }  
    },
    Query: {   
        async user(_, {ID}) {
            return await User.findById(ID)
        },
        checkEmailExists: async (_, { email }, { models }) => {
            const user = await models.User.findOne({ where: { email } });
            return Boolean(user);
          },
          
    },
  }
module.exports = resolvers;
   