const otpTemplate = require("../mail/emailVerificationTemplate.js");
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

// Streamlined background execution handler
async function sendVerificationEmail(email, otp) {
    // Await hata diya hai taaki thread block na ho
    mailSender(email, "Verification Email from TED", otpTemplate(otp))
        .then((mailResponse) => {
            console.log("✅ OTP Email queued successfully in background:", mailResponse);
        })
        .catch((error) => {
            console.error("❌ Background Mail Sender Failed:", error.message);
        });
}

// FIXED: pre("save") ko badal kar post("save") kar diya hai
OTPSchema.post("save", async function (doc) {
    try {
        // Safe document data reference passing
        sendVerificationEmail(doc.email, doc.otp);
    } catch (error) {
        console.error("Hook catch block logs:", error);
    }
});

module.exports = mongoose.model('OTP', OTPSchema);