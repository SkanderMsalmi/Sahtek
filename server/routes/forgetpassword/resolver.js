
const nodemailer = require('nodemailer');
const crypto = require('crypto');



const resetPasswordUp = async (parent, args) => {
  

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
    