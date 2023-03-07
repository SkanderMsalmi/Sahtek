const nodemailer = require('nodemailer');


 

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
			  user: "4bfc769eb2d1e2",
			  pass: "1631ad4ea1e71a"
			},
		});

		await transporter.sendMail({
			from: 'sahtek2023@gmail.com',
			to: email,
			subject: subject,
			text: text,
			html: `<h1>Your verification code : ${text} </h1>`
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};