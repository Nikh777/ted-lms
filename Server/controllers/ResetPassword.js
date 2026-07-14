const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const crypto = require('crypto');
const bcrypt = require('bcrypt');


// reset password
exports.resetPasswordToken = async (req, res) => {
    try{
        // get email from request body

  const email = req.body.email;

  // check user exist or not 
  const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }

    // generate token
    const token = crypto.randomUUID();

    // update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
        { email: email },
        {
            token: token,
            resetPasswordExpires: Date.now() + 5 * 60 * 1000, // 5 minutes
        },
        { new: true }
    );

    // create url for reset password
    const url = `http://localhost:3000/update-password/${token}`;
    // send email containing url
    await mailSender(
        email,
        'Password Reset Request',
        `Click the link to reset your password: ${url}`
    );

         //return response 
         return res.json({
            success: true,
            message: 'Password reset link sent to your email',
         });
}   
catch(error){
    console.error('Error in resetPasswordToken: ', error);
    return res.status(500).json({
        success: false,
        message: 'Something went wrong',
    
    });
}

    }

    // reset password
    exports.resetPassword = async (req, res) => {
        try {
            // data fetch
            const { password, confirmPassword, token } = req.body;

            // validation
            if (!password || !confirmPassword || !token) {
                return res.status(400).json({
                    success: false,
                    message: 'All fields are required',
                });
            }

            if (password !== confirmPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Password not matching',
                });
            }

            // get user details from db using token
            const userDetails = await User.findOne({ token: token });

            // if no entry - invalid token
            if (!userDetails) {
                return res.status(404).json({
                    success: false,
                    message: 'Invalid token',
                });
            }

            // token time check
            if (userDetails.resetPasswordExpires < Date.now()) {
                return res.status(400).json({
                    success: false,
                    message: 'Token expired',
                });
            }

            // hash new password and update db
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.findOneAndUpdate(
                { token: token },
                { password: hashedPassword, token: null, resetPasswordExpires: null },
                { new: true }
            );

            return res.status(200).json({
                success: true,
                message: 'Password reset successful',
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };