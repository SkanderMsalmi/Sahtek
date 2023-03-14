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
const nodemailer = require("nodemailer");


const BASE_URL = "http://localhost:3000";

const resolvers = {
  Mutation: {
    updateTherapist: async (
      _,
      {
        therapistInput: {
          id,
          license,
          specialties,
          description,
          availability,
          education,
          experience,
          languages,
          fees,
          ratings,
          reviews,
          address,
          phoneNumber,
        },
      }
    ) => {
      const existingUser = await User.findById(id);
      console.log(existingUser);
      if (!existingUser) {
        throw new Error("User doesn't exist");
      }
      if (license) {
        existingUser.therapist.license = license;
      }
      if (specialties) {
        existingUser.therapist.specialties = specialties;
      }
      if (description) {
        existingUser.therapist.description = description;
      }
      if (availability) {
        existingUser.therapist.availability = availability;
      }
      if (education) {
        existingUser.therapist.education = education;
      }
      if (experience) {
        existingUser.therapist.experience = experience;
      }
      if (languages) {
        existingUser.therapist.languages = languages;
      }
      if (fees) {
        existingUser.therapist.fees = fees;
      }
      if (ratings) {
        existingUser.therapist.ratings = ratings;
      }
      if (reviews) {
        existingUser.therapist.reviews = reviews;
      }
      if (address) {
        existingUser.therapist.address = address;
      }
      if (phoneNumber) {
        existingUser.therapist.phoneNumber = phoneNumber;
      }
      await existingUser.save();
      return existingUser;
    },
    update: async (_, { userInput: { id, name, dateOfBirth,password, oldPassword }, image }) => {
      const existingUser = await User.findById(id);
    
      const passwordHashed =await bcrypt.hashSync(password, 10)||existingUser.password;
      
      if (!existingUser) {
        throw new Error("User doesn't exist");
      }
      if (password){
        if (!bcrypt.compareSync(oldPassword, existingUser.password)) {
          throw new Error("Incorrect password");
        }
        existingUser.password=passwordHashed;
      }
      if (image) {
        profileImage = await readFile(image);
        existingUser.profileImage = profileImage;
      }
      if (name) {
        existingUser.name = name;
      }
      if (dateOfBirth) {
        existingUser.dateOfBirth = dateOfBirth;
      }
      await existingUser.save();
      return existingUser;
    },
    register: async (
      parent,
      { userInput: { email, password, name, dateOfBirth, role, gender }, image }
    ) => {
      let profileImage = "";
      if (gender === "Other") {
        profileImage = "http://localhost:5000/other.jpg";
      } else {
        if (role === "Patient") {
          if (gender === "Male") {
            profileImage = "http://localhost:5000/patientM.png";
          } else if (gender === "Female") {
            profileImage = "http://localhost:5000/patientF.png";
          }
        } else if (role === "Therapist") {
          if (gender === "Male") {
            profileImage = "http://localhost:5000/therapistM.png";
          }
          if (gender === "Female") {
            profileImage = "http://localhost:5000/therapistF.png";
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
          gender,
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
          gender,
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
      if (!user) {
        throw new ApolloError("Email doesn't exist");
      }

      // resend email verification

      if (user.verified === false) {
        let token = await Token.findOne({ userId: user.id });
        if (!token) {
          const token2 = await new Token({
            userId: user.id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();
          const url = `${BASE_URL}/${user.id}/verify/${token2.token}`;
          await sendEmail(user.email, "Email Verification", String(url));


        } else if (token) {
          const url = `${BASE_URL}/${user.id}/verify/${token.token}`;
          await sendEmail(user.email, "Email Verification", String(url));

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

    resetPassword: async (parent, args) => {
      const { email } = args;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "sahtek2023@gmail.com",
          pass: "qrowlwkuavbwonwo",
        },
      });

      const user = await User.findOne({ email });
      const secret = "ggggg" + user.password;
      const payload = {
        email: user.email,
        id: user.id,
      };
      const token = jwt.sign(payload, secret + { expiresIn: "15m" });
      const mailOptions = {
        from: "sahtek2023@gmail.com",
        to: email,
        subject: "Reset Password Link",
        text: `Please click on the following link to reset your password: http://localhost:3000/resetPassword/${user.id}/${token}`,
      };
      await transporter.sendMail(mailOptions);
      return true;
    },
    resetPasswordlink: async (parent, args) => {
      const { userid, token, newpassword } = args;

      const user = await User.findById(userid);
      // const secret=key+user.password

      //const payload=jwt.verify(token,secret)
      user.password = bcrypt.hashSync(newpassword, 10);
      await user.save();
      return true;
    },

    resendMailVerification: async (parent, args, context, info) => {
      console.log(args);
      const { id } = args;

      const user = await User.findById(id);
      if (user) {
       
        const token2 = new Token({
          userId: id,
          token: crypto.randomBytes(32).toString("hex"),
        })
        const tokenexist = await Token.findOne({ userId: id })
        if(tokenexist){
        await Token.findOneAndUpdate(id,{userId : id, token : token2.token })}
        else{
          token2.save();
        }
        
        const url = `${BASE_URL}/${token2.userId}/verify/${token2.token}`;
        await sendEmail(user.email, "Email Verification", String(url));

        return "mail sent";
      } else if (!user) {
        return "user not found";
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
  },
};

module.exports = resolvers;
