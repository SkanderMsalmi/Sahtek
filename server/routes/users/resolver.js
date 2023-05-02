const {
  Patient,
  Therapist,
  User,
  Appointment,
} = require("../../database/models/User");
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
const { Router } = require("express");
const moment = require("moment");

const BASE_URL = "http://localhost:3000";

const resolvers = {
  Mutation: {
    updateTherapist: async (
      _,
      {
        therapistInput: {
          id,
          licenses,
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
      if (!existingUser) {
        throw new Error("User doesn't exist");
      }
      if (licenses) {
        existingUser.therapist.licenses = licenses;
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
    update: async (
      _,
      { userInput: { id, name, dateOfBirth, password, oldPassword }, image }
    ) => {
      const existingUser = await User.findById(id);
      let passwordHashed = "";
      if (password) {
        passwordHashed = bcrypt.hashSync(password, 10) || existingUser.password;
      }

      if (!existingUser) {
        throw new Error("User doesn't exist");
      }
      if (password) {
        if (!bcrypt.compareSync(oldPassword, existingUser.password)) {
          throw new Error("Incorrect password");
        }
        existingUser.password = passwordHashed;
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
      const token = jwt.sign(payload, secret + { expiresIn: "2m" });
      const token2 = new Token({
        userId: user.id,
        token: token,
      });
      token2.save();
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

      user.password = bcrypt.hashSync(newpassword, 10);
      await user.save();
      return true;
    },
    bookAppointment: async (
      _,
      { patient, therapist, date, duration, notes, status }
    ) => {
      const p = await User.findById(patient);
      const d = await User.findById(therapist);

      const existingAppointment = await Appointment.findOne({
        date: date,
        therapist: d,
        patient: p,
        // date: { $lte: new Date(date).getTime() + 60 * 60 * 1000 },
      });
      const patientaleardyhaveone = await Appointment.findOne({
        date: date,
        patient: p,
        // date: { $lte: new Date(date).getTime() + 60 * 60 * 1000 },
      });
      console.log(existingAppointment);
      if (existingAppointment || patientaleardyhaveone) {
        throw new Error("Time slot not available");
      }

      const appointment = new Appointment({
        patient: p.id,
        therapist: d.id,
        date,
        duration,
        notes,
        status,
      });
      await appointment.save();

      return true;
    },

    AcceptAppointment: async (_, { idAppointment }) => {
      const appointment = await Appointment.findById(idAppointment);

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

      const userPatient = await User.findById(appointment.patient);
      const userTherapist = await User.findById(appointment.therapist);
      appointment.status = "Confirmed";
      await appointment.save();
      const mailOptions = {
        from: "sahtek2023@gmail.com",
        to: userPatient.email,
        subject: "Appointment Accepted",
        text: `Your appointment is confirmed by Dr  ${userTherapist.name} it will be at ${appointment.date} Welcome ${userPatient.name} the consultation link:http://localhost:3000/videoCall/${appointment.id} `,
      };
      await transporter.sendMail(mailOptions);
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
        });
        const tokenexist = await Token.findOne({ userId: id });
        if (tokenexist) {
          await Token.findOneAndUpdate(id, { userId: id, token: token2.token });
        } else {
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
    async users() {
      return await User.find({
        role: "Therapist",
      });
    },
    async user(_, { ID }) {
      return await User.findById(ID);
    },
    async getTherapistsByPatient(_, { ID }) {
      let listTherapist = [];
      const therapistsId = await Appointment.find({
        patient: ID,
        status: "Confirmed",
      }).distinct("therapist");
      for (let i = 0; i < therapistsId.length; i++) {
        listTherapist.push(await User.findById(therapistsId[i]));
      }
      return listTherapist;
    },
    async therapist(_, { ID }) {
      const user = await User.findById(ID);
      if (user.therapist) {
        const ratings = user.therapist.ratings;
        const ratingCount = ratings.length;
        const ratingSum = ratings.reduce((total, rating) => total + rating, 0);
        const ratingAverage = ratingCount > 0 ? ratingSum / ratingCount : 0;
        return { user, rating: ratingAverage };
      } else return await User.findById(ID);
    },

    async getAppointment(_, { ID }) {
      const a = await Appointment.findById(ID);
      if (a === null) {
        throw new Error("Appointment not found");
      }
      return a;
    },
    async getAppointments() {
      return await Appointment.find();
    },
    async getAppointmentsByPatient(_, { ID }) {
      let appointments = await Appointment.find({ patient: ID });

      return appointments
        .filter((appointment) => {
          const date = new Date(appointment.date);
          return date > new Date();
        })
        .sort((a, b) => {
          return a.date - b.date;
        });
    },
    async getAppointmentsByTherapist(_, { therapist }) {
      return await Appointment.find({ therapist });
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

    getPatientsByTherapist: async (_, { id }) => {
      const list = await Appointment.find({
        therapist: id,
        status: "Confirmed",
      }).distinct("patient");
      return await User.find({ _id: { $in: list } });
    },
  },

  Appointment: {
    async patient(appointment) {
      return await User.findById(appointment.patient);
    },
    async therapist(appointment) {
      return await User.findById(appointment.therapist);
    },
  },
};

module.exports = resolvers;
