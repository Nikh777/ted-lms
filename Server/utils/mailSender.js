const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // <-- Port 587 se badal kar 465 kar do
    secure: true, // <-- Ise true kar do kyunki 465 direct secure SSL hota hai
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false // <-- Ye timeout aur handshake failure ko rokkta hai
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