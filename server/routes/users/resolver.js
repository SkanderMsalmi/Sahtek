const { Patient, Therapist, User } = require("../../database/models/User");
const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { key, keyPub } = require("../../keys");
// const { setCookie } = require('./cookies');
const Token = require("../../database/models/verificationToken");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");
const { readFile } = require("../../utils/uploadFile");
const BASE_URL = "http://localhost:3000";


const resolvers = {
  Mutation: {
    register: async (
      parent,
      { userInput: { email, password, name, dateOfBirth, role }, image }
    ) => {
      let profileImage = "";
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User with that email already exists");
      }
      if (image) {
        profileImage = await readFile(image);
      }
      const passwordHashed = await bcrypt.hashSync(password, 10);
      let user;
      if (role == "Patient") {
        user = new User({
          email,
          password: passwordHashed,
          role,
          profileImage,
          name,
          dateOfBirth,
          patient: {},
        });
      } else if (role == "Therapist") {
        user = new User({
          email,
          password: passwordHashed,
          role,
          profileImage,
          name,
          dateOfBirththerapist: {},
        });
      }
      //send email verification
      const token2 = await new Token({
        userId: user.id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
      const url = `${BASE_URL}/${user.id}/verify/${token2.token}`;
      await sendEmail(user.email, "Email Verification", String(url));
      //
      await user.save();
      return user;
    },



    async login(parent, { email, password }, { res }) {
      let user = await User.findOne({ email });
      let token = await Token.findOne({ userId: user.id })
      if (!user) {
        throw new ApolloError("Email doesn't exist");
      }

      // resend email verification

      if (user.verified === false) {
        if (!token) {
          const token2 = await new Token({
            userId: user.id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();
          const url = `${BASE_URL}/${user.id}/verify/${token2.token}`;
          await sendEmail(user.email, "Email Verification", String(url));
          throw new ApolloError("check your email for verification");
        } else if (token) {
          const url = `${BASE_URL}/${user.id}/verify/${token.token}`;
          await sendEmail(user.email, "Email Verification", String(url));
          throw new ApolloError("We have sent you mail to verify your account");
        }

      }
      //

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({}, key, {
          subject: user._id.toString(),
          algorithm: "RS256",
          expiresIn: 60 * 60 * 60 * 30 * 6,
        });
        return {
          token,
          user,
        };

      } else {
        throw new ApolloError("Password Incorrect");
      }

    },

     

    resendMailVerification: async (parent, args, context, info)=>{
     console.log(args)
      const{id}= args  
         
      const user = await User.findById(id);
      if (user) {

        const token2 = await new Token({
          userId: id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${BASE_URL}/${token2.userId}/verify/${token2.token}`;
        await sendEmail(user.email, "Email Verification", String(url));

        return "mail sent"
      }
      else if(!user) {
        return "user not found"
      }
  },
  },








  Query: {
    async user(_, { ID }) {
      return await User.findById(ID);
    },
    checkEmailExists: async (_, { email }, { models }) => {
      const user = await models.User.findOne({ where: { email } });
      return Boolean(user);
    },
    async current(_, { token }) {
      if (token) {
        try {
          const decodedToken = jwt.verify(token, keyPub);
          const currentUser = await User.findById(decodedToken.sub).exec();
          if (currentUser) {
            return currentUser;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      } else {
        return null;
      }
    },
    // sendForgotPasswordEmail: async (
    //     _,
    //     { email },
    //     { redis }
    //   ) => {
    //     const user = await User.findOne({ where: { email } });
    //     if (!user) {
    //       return [
    //         {
    //           path: "email",
    //           message: userNotFoundError
    //         }
    //       ];
    //     }

    //     return true;
    //   },
    //   forgotPasswordChange: async (
    //     _,
    //     { newPassword, key },
    //     { redis }
    //   ) => {
    //     const redisKey = `${forgotPasswordPrefix}${key}`;

    //     const userId = await redis.get(redisKey);
    //     if (!userId) {
    //       return [
    //         {
    //           path: "key",
    //           message: expiredKeyError
    //         }
    //       ];
    //     }

    //     try {
    //       await schema.validate({ newPassword }, { abortEarly: false });
    //     } catch (err) {
    //       return formatYupError(err);
    //     }

    //     const hashedPassword = await bcrypt.hash(newPassword, 10);

    //     const updatePromise = User.update(
    //       { id: userId },
    //       {
    //         forgotPasswordLocked: false,
    //         password: hashedPassword
    //       }
    //     );

    //     const deleteKeyPromise = redis.del(redisKey);

    //     await Promise.all([updatePromise, deleteKeyPromise]);

    //     return null;
    //   }
  },

  // sendForgotPasswordEmail: async (
  //     _,
  //     { email },
  //     { redis }
  //   ) => {
  //     const user = await User.findOne({ where: { email } });
  //     if (!user) {
  //       return [
  //         {
  //           path: "email",
  //           message: userNotFoundError
  //         }
  //       ];
  //     }

  //     return true;
  //   },
  //   forgotPasswordChange: async (
  //     _,
  //     { newPassword, key },
  //     { redis }
  //   ) => {
  //     const redisKey = `${forgotPasswordPrefix}${key}`;

  //     const userId = await redis.get(redisKey);
  //     if (!userId) {
  //       return [
  //         {
  //           path: "key",
  //           message: expiredKeyError
  //         }
  //       ];
  //     }

  //     try {
  //       await schema.validate({ newPassword }, { abortEarly: false });
  //     } catch (err) {
  //       return formatYupError(err);
  //     }

  //     const hashedPassword = await bcrypt.hash(newPassword, 10);

  //     const updatePromise = User.update(
  //       { id: userId },
  //       {
  //         forgotPasswordLocked: false,
  //         password: hashedPassword
  //       }
  //     );

  //     const deleteKeyPromise = redis.del(redisKey);

  //     await Promise.all([updatePromise, deleteKeyPromise]);

  //     return null;
  //   }
};
module.exports = resolvers;
