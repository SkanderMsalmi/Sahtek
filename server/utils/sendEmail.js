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
			html: `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Document</title>

				 
			
			 
				  
			</head>
			
			<body  style=" min-height: 60vh;    
			background: #cdf0f0;    padding-left: 27%;  padding-top: 10%" >
		 
			<form class="verify-form" style="      padding: 40px;  

				border-radius: 15px;
				width: 400px;  background: #ffffff;" >
					<h3   style="font-size: 25px; font-weight: 700; letter-spacing: -1px; line-height: 48px;  color: #403D39;  
					  margin-bottom : 15px;
						margin-top:20px;">Verify your email </h3>
					
					 
					  <p   style=" margin-bottom: 0px; font-size: 17px;
				  color: #1b1b1b;  ">Hello! Please click the button below to verify your email address.</p>
					 <a   href="${text}">
					   <button style="width: 100%;
					   margin-top: 40px;
						   margin-bottom: 20px;
				  
					  background   :#51cbce ;
					   color: #ffffff;
					  padding:15px;
					font-size: 17px;
					  border-radius: 15px;  border-width: 0px"  class="btn btn-primary ">Verify Email</button></a>
				   </form> 
			 
				
				
			</body>
			</html> `
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};