const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // Port 465 ke liye true hona zaroori hai
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false // Handshake failure ko rokkne ke liye
            },
            // Railway ko IPv4 use karne ke liye force karne ki strict setting
            family: 4 
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