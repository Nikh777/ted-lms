const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        let info = await transporter.sendMail({
            from: `"TED LMS Platform" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        });

        console.log('✅ Mail successfully dispatched:', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Nodemailer Error:', error.message);
        throw error;
    }
};

module.exports = mailSender;