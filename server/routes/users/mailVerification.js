const verificationToken = require('../../database/models/verificationToken');
const { Patient, Therapist, User } = require('../../database/models/User');
const { ObjectId } = require('mongoose/lib/schema/index');

const mailVerification = {


    Mutation: {
        verifyToken: async (parent, args, context, info) => {
            const { userId } = args;
            const { token } = args.verificationTokenInput;
            const Token = await verificationToken.findOne({ token });
            const user = await User.findById(userId);
            if (Token) {
                await verificationToken.findOneAndDelete({ token }, { userId })
                await User.findByIdAndUpdate(userId, { verified: true });
                console.log("your account is verified");
                return "success"
            }
            if (!Token) {
                if (user) {
                    if (user.verified == false) { 
                        return "expired" }
                   
                    if(user.verified == true){
                        return "success"
                    }
                }
                if(!user){
                    return "not found"
                }
            }
            else {
                return "not found"
            }


        },



    }

}

module.exports = mailVerification;