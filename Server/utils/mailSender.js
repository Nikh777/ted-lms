const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, // must be: smtp.gmail.com
            port: 465, // Direct high-security SSL port configuration
            secure: true, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // Standard 16-letter App password without spaces
            },
            tls: {
                rejectUnauthorized: false // Bypasses self-signed network drop delays on proxy environments
            }
        });

        let info = await transporter.sendMail({
            from: `"TED LMS Platform" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: title,
            html: body, // Yahan aapka compiled otpTemplate output insert hota hai
        });
        
        console.log('✅ Outbound secure mail successfully sent via transporter:', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Nodemailer Deep Transport Error Exception:', error.message);
        throw error;
    }
};

module.exports = mailSender;