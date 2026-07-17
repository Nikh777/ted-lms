const User = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate a random 6-digit OTP
exports.sendOTP = async (req, res) => {
    try {
        // Extract email from the request body
        const { email } = req.body;

        // Validation: Check if email is present
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required',
            });
        }

        // Validation: Check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address',
            });
        }

        // Check if the user exists in the database
        const checkUserPresent = await User.findOne({ email });

        // If the user is found, return an explicit 401 response
        if (checkUserPresent) {
            return res.status(401).json({ 
                success: false,
                message: 'User Already Exists',
             });
        }

        // Generate a random 6-digit OTP
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("Generated OTP: ", otp);

        // check unique otp or not
        let result = await OTP.findOne({ otp: otp });
        
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp: otp });
        }   
        
        const otpPayload = {
            email,
            otp,
        };

        // create an entry for the OTP in the database
        const otpBody = await OTP.create(otpPayload);
        console.log("✅ OTP Saved Successfully via Model Event Pipeline");
        console.log("OTP entry created in the database: ", otpBody);

        // Return a success response
        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp,
        });
    } catch (error) {
        console.error('Error in sendOTP: ', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};


// signup 
exports.signup = async (req, res) => {
    try {
        // data fetch krunga request ki body se
        const { email, password, otp, firstName, lastName, confirmPassword, contactNumber } = req.body;

        // validate krunga ki saari mandatory fields hai ki nahi
        if(!email || !password || !otp || !firstName || !lastName || !confirmPassword ){
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        
        // Password match krte hai ki nahi
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: 'Password and Confirm Password do not match',
            });
        }
        
        // check user already exist krta hai ki nhi 
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email',
            });
        }
        
        // FIND THE ABSOLUTE LATEST OTP GENERATED FOR THIS EMAIL
        const recentOTP = await OTP.findOne({ email }).sort({ createdAt: -1 });
        console.log("Recent Stored OTP Object from Database: ", recentOTP);
        console.log("Incoming Frontend Input Verification OTP: ", otp);

        // FOOLPROOF VALIDATION LAYER WITH TYPE CASTING AND STRIPPING
        if (!recentOTP) {
            return res.status(400).json({
                success: false,
                message: 'OTP has expired or was never generated. Please resend.',
            });
        }

        const incomingOtpString = String(otp).trim();
        const databaseOtpString = String(recentOTP.otp).trim();

        if (databaseOtpString !== incomingOtpString) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP. Verification token code mismatch.',
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password generated: ", hashedPassword);

        // save profileDetails template to database
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        // Create main user blueprint record inside collection
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType: "Student",
            contactNumber,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });
        console.log("User successfully created in the database: ", user);

        // return success response  
        return res.status(200).json({
            success: true,
            message: 'User created successfully',
            user,
        });

    } catch (error) {
        console.error('Error in signup context execution sequence: ', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

// login
exports.login = async (req, res) => {
    try {
        // get data from request body
        const { email, password } = req.body;
        
        // validate data
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Email and Password are required',
            });
        }
        
        // check user exist or not
        const user = await User.findOne({ email }).populate('additionalDetails');
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User does not exist with this email',
            });
        }
        
        // generate jwt, after password matching
        if(await bcrypt.compare(password, user.password)){
            // Check if account is scheduled for deletion and cancel it
            if (user.deletionScheduled) {
                user.deletionScheduled = false;
                user.deletionDate = null;
                await user.save();
            }

            const payload = {
                userId: user._id,
                email: user.email,
                accountType: user.accountType,
            };

            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h",
                }
            );
            user.token = token;
            user.password = undefined;

            // create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            
            res.cookie('token', token, options).status(200).json({
                success: true,
                message: 'Login successful',
                user,
                token,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials',
            });
        }
    }
    catch(error){
        console.error('Error inside login matrix execution:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};


// change password
exports.changePassword = async (req, res) => {
    try {
        // get data from request body
        const { email, oldPassword, newPassword, confirmNewPassword } = req.body;

        // ================= VALIDATION =================
        if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // check new password match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: 'New password and confirm password do not match',
            });
        }

        // ================= CHECK USER =================
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // ================= VERIFY OLD PASSWORD =================
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Old password is incorrect',
            });
        }

        // ================= HASH NEW PASSWORD =================
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // ================= UPDATE PASSWORD =================
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Password changed successfully',
        });

    } catch (error) {
        console.log("Password Mutation Failure logs:", error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong within the password handler context',
        });
    }
};