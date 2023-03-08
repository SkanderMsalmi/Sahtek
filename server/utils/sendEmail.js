const nodemailer = require('nodemailer');


 

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			gmail: "gmail",
			port: 465,
			secure: true,
			auth: {
			  user: "sahtek2023@gmail.com",
			  pass: "qrowlwkuavbwonwo"
			},
		});

		await transporter.sendMail({
			from: 'sahtek2023@gmail.com',
			to: email,
			subject: subject,
			text: text,
			html: `<p>Please click on the following link to verify your email address:</p> ${text} `
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};