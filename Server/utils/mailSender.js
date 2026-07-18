const axios = require('axios');

const mailSender = async (email, title, body) => {
    try {
        const response = await axios.post('https://api.brevo.com/v3/smtp/email', {
            sender: { name: "TED LMS Platform", email: process.env.EMAIL_USER }, // Aapki Gmail ID
            to: [{ email: email }],
            subject: title,
            htmlContent: body
        }, {
            headers: {
                'api-key': process.env.BREVO_API_KEY, // Railway variables se key uthayega
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ Mail successfully dispatched via Brevo API:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Brevo API Error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

module.exports = mailSender;