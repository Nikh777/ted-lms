const { Resend } = require('resend');

// Resend official initialization helper
// Render Environment variable se API key check karega
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

const mailSender = async (email, title, body) => {
    try {
        // Direct API payload routing (Bypasses all network TCP port blockings)
        const data = await resend.emails.send({
            from: 'TED LMS Platform <onboarding@resend.dev>', // Free default sandbox testing email
            to: email,
            subject: title,
            html: body,
        });

        console.log('✅ Mail successfully dispatched via Resend API Framework:', data.id);
        return data;
    } catch (error) {
        console.error('❌ Resend API Transport Exception Error:', error.message);
        throw error;
    }
};

module.exports = mailSender;