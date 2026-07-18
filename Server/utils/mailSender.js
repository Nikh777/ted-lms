const axios = require('axios');

const mailSender = async (email, title, body) => {
    try {
        const response = await axios.post('https://api.brevo.com/v3/smtp/email', {
            sender: { name: "TED LMS Platform", email: process.env.EMAIL_USER }, 
            to: [{ email: email }],
            subject: title,
            htmlContent: body
        }, {
            headers: {
                'accept': 'application/json',
                'api-key': String(process.env.BREVO_API_KEY).trim(), // Kisi bhi space ko auto-clean karega
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