const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        // Render Cloud Compatibility Setup (Port 587 TLS)
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, // smtp.gmail.com
            port: 587, // Standard open port for Cloud platforms (Render/Vercel)
            secure: false, // Must be false for port 587
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // App password without spaces
            },
            tls: {
                rejectUnauthorized: false // Bypasses proxy network drop delays
            }
        });

        let info = await transporter.sendMail({
            from: `"TED LMS Platform" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        });
        
        console.log('✅ Mail successfully dispatched from dynamic queue:', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Nodemailer Deep Transport Error Exception:', error.message);
        throw error;
    }
};

module.exports = mailSender;