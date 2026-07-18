const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        // Strict Configuration Verification Mapping
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Explicitly setting service tells Nodemailer exactly how to routing
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
                user: process.env.EMAIL_USER, // Ensure this exact name is in Render Dashboard
                pass: process.env.EMAIL_PASS, // 16-character google app password
            },
            tls: {
                rejectUnauthorized: false
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