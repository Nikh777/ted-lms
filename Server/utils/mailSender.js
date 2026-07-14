const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        }); 
        let info = await transporter.sendMail({
            from: `TED <${process.env.EMAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        });
        console.log('Email sent successfully');
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = mailSender;