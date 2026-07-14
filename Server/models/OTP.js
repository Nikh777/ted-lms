const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // OTP expires after 5 minutes (300 seconds)
    },
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Verification Email from TED", otp);
        console.log("Email sent successfully: ", mailResponse);
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
}

// Pre-save hook to send email before the document is saved to the database
OTPSchema.pre("save", async function () {
    try {
        if (this.isNew) {
            await sendVerificationEmail(this.email, this.otp);
        }
    } catch (error) {
        console.log(error);
    }
});
module.exports = mongoose.model('OTP', OTPSchema);