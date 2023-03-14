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

const resolvers = {
  Mutation: {
    updateTherapist: async (_, { therapistInput: { id,license,specialties,description,availability,education,experience,languages,fees,ratings,reviews,address, phoneNumber,  } }) => {
      const existingUser = await User.findById(id);
      console.log(existingUser)
      if (!existingUser) {
        throw new Error("User doesn't exist");
      }
      if (license){
      existingUser.therapist.license = license;
      }
      if (specialties){
      existingUser.therapist.specialties = specialties;
      }
      if (description){
      existingUser.therapist.description = description;
      }
      if (availability){
      existingUser.therapist.availability = availability;
      }
      if (education){
      existingUser.therapist.education = education;
      }
      if (experience){
      existingUser.therapist.experience = experience;
      }
      if (languages){
      existingUser.therapist.languages = languages;
      }
      if (fees){
      existingUser.therapist.fees = fees;
      }
      if (ratings){
      existingUser.therapist.ratings = ratings;
      }
      if (reviews){
      existingUser.therapist.reviews = reviews;
      }
      if (address){
      existingUser.therapist.address = address;
      }
      if (phoneNumber){
      existingUser.therapist.phoneNumber = phoneNumber;
      }
      await existingUser.save();
      return existingUser;
    },
    update: async (_, { userInput: { id, name, dateOfBirth },image }) => {
      const existingUser = await User.findById(id);
      if (!existingUser) {
        throw new Error("User doesn't exist");
      }
      if (image) {
        profileImage = await readFile(image);
        existingUser.profileImage = profileImage;
      }
      if (name){
      existingUser.name = name;
      }
      if (dateOfBirth){
      existingUser.dateOfBirth = dateOfBirth;
      }
      await existingUser.save();
      return existingUser;
      
    },
    register: async (
      parent,
      { userInput: { email, password, name, dateOfBirth, role,gender }, image }
    ) => {
      let profileImage="";
      if (gender === "OTHER"){
        profileImage = "http://localhost:5000/other.jpg"
      }
      else{
      if (role ==="Patient")
      {
        if (gender === "MALE"){
           profileImage = "http://localhost:5000/patientM.png"
        }
        else if (gender === "FEMALE"){
           profileImage = "http://localhost:5000/patientF.png"
        }
      }
      else if (role ==="Therapist") {
        if (gender === "MALE"){
          profileImage = "http://localhost:5000/therapistM.png"
        }
        if (gender === "FEMALE"){
          profileImage = "http://localhost:5000/therapistF.png"
        }
      }
    }
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
          dateOfBirth,
          therapist: {},
        });
      }
      //send email verification
      const BASE_URL = "http://localhost:3000";

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
      if (!user) {
        throw new ApolloError("Email doesn't exist");
      }
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
