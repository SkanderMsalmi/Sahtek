
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sahtek2023@gmail.com', 
    pass: 'SahtekApp' 
  },
});

const resetPassword = async (parent, args) => {
  const { email } = args;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  const token = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();
  const mailOptions = {
    from: 'sahtek2023@gmail.com',
    to: email,
    subject: 'Reset Password Link',
    text: `Please click on the following link to reset your password: ${process.env.CLIENT_URL}/reset-password/${token}`,
  };
  await transporter.sendMail(mailOptions);
  return true;
};
// const resolvers = {
  
//     resetPassword: ({ email }) => {
//       // Vérifier que l'email est valide
//     //   if (!isValidEmail(email)) {
//     //     throw new Error('Invalid email address');
//     //   }
//     //   const token = crypto.randomBytes(20).toString('hex');

//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'sahtek2023@gmail.com', 
//           pass: 'SahtekApp' 
//         }

//       });
//       const mailOptions = {
//         from: 'sahtek2023@gmail.com', 
//         to: email,
//         subject: 'Password reset request',
//         text: `To reset your password, please click on this link: http://localhost:3000/resetPassword`
//       };
//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log(error);
//           throw new Error('Failed to send password reset email');
//         } else {
//           console.log('Password reset email sent: ' + info.response);
//           return 'Password reset email sent';
//         }
        
//       });
     
//     },
   
//     };
    