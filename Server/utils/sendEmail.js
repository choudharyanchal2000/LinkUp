const nodeMailer = require('nodemailer')

const sendEmail = async ({email, subject, message}) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        service: process.env.SMTP_SERVICE,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });
     
      const options = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: subject,
        text: message,
      };
    
    const info=  await transporter.sendMail(options);
    
}


module.exports = sendEmail