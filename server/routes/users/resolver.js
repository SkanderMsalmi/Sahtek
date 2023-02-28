const User = require('../../database/models/User');
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
        async registerUser(_,{registerInput:{name,email,password}}){
            //Check user Exists
            const oldUser = await User.findOne({email});

            if(oldUser){
                throw new ApolloError('A user is already registered with the email' + email,"USER_ALREADY_EXISTS");
            }

            //Encrypt password

            var encryptedPassword = await bcrypt.hash(password,10);

            //Create User

            const newUser = new User({
                name:name,
                email:email.toLowerCase(),
                password:encryptedPassword
            });
            
            //create token JWT
            const token = jwt.sign(
                {user_id:newUser._id,email},
                key,{
                    expiresIn: 3600*24*30*6,
                    algorithm:'RS256'
                }
                
            );

            newUser.token = token;

            //save

            const res = await newUser.save();

            return {
                id : res.id,
                ...res._doc
            }

        },
        async loginUser(_,{loginInput: {email,password}}){
            // if user exists
            const user = await User.findOne({email});
            //check password
            if(user && (await bcrypt.compare(password,user.password))){
                // Create new token
                const token = jwt.sign(
                    {user_id:user._id,email},
                    key,{
                        expiresIn: 3600*24*30*6,
                        algorithm:'RS256'
                    }
                    
                );
    
                // attach token to user
                user.token = token;
    
                return {
                    id:user.id,
                    ...user._doc
                }
            }else{
                //if user doesn't exists
                throw new ApolloError('Incorrect password','INCORRECT_PASSWORD');
            }
    
    
        },
    },
    Query:{
        user: (_,{ID})=> User.findById(ID)
    }
}

module.exports = resolvers;
   