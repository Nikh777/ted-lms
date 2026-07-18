const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        // Rigid Production-Grade SMTP Configuration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,             // Port strictly 587
            secure: false,         // secure must be false for 587
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false, // Prevents proxy drop downs
                minVersion: 'TLSv1.2'      // Enforces network standards
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