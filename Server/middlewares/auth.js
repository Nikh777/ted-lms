// Importing required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

// Configuring dotenv
dotenv.config();

// ========================================
// AUTH MIDDLEWARE
// ========================================
exports.auth = async (req, res, next) => {
	try {
		console.log("AUTH MIDDLEWARE HIT");

		const authHeader = req.header("Authorization");
		console.log("AUTH HEADER =", authHeader);

		const token =
			req.cookies?.token ||
			req.body?.token ||
			(authHeader ? authHeader.replace("Bearer ", "") : null);

		console.log("TOKEN =", token);

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Token Missing",
			});
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			console.log("DECODED TOKEN =", decoded);

			req.user = decoded;
		} catch (error) {
			console.log("JWT VERIFY ERROR =", error.message);

			return res.status(401).json({
				success: false,
				message: "Token is Invalid",
			});
		}

		next();
	} catch (error) {
		console.log("AUTH ERROR =", error);

		return res.status(401).json({
			success: false,
			message: "Something Went Wrong While Validating the Token",
		});
	}
};

// ========================================
// STUDENT MIDDLEWARE
// ========================================
exports.isStudent = async (req, res, next) => {
	try {
		const userDetails = await User.findById(req.user.userId);

		console.log("USER DETAILS =", userDetails);

		if (!userDetails) {
			return res.status(404).json({
				success: false,
				message: "User Not Found",
			});
		}

		if (userDetails.accountType !== "Student") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Students",
			});
		}

		next();
	} catch (error) {
		console.log("STUDENT MIDDLEWARE ERROR =", error);

		return res.status(500).json({
			success: false,
			message: "User Role Can't be Verified",
		});
	}
};

// ========================================
// ADMIN MIDDLEWARE
// ========================================
exports.isAdmin = async (req, res, next) => {
	try {
		const userDetails = await User.findById(req.user.userId);

		console.log("USER DETAILS =", userDetails);

		if (!userDetails) {
			return res.status(404).json({
				success: false,
				message: "User Not Found",
			});
		}

		if (userDetails.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}

		next();
	} catch (error) {
		console.log("ADMIN MIDDLEWARE ERROR =", error);

		return res.status(500).json({
			success: false,
			message: "User Role Can't be Verified",
		});
	}
};

// ========================================
// INSTRUCTOR MIDDLEWARE
// ========================================
exports.isInstructor = async (req, res, next) => {
	try {
		console.log("REQ USER =", req.user);

		const userDetails = await User.findById(req.user.userId);

		console.log("USER DETAILS =", userDetails);

		if (!userDetails) {
			return res.status(404).json({
				success: false,
				message: "User Not Found",
			});
		}

		console.log("ACCOUNT TYPE =", userDetails.accountType);

		if (userDetails.accountType !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}

		next();
	} catch (error) {
		console.log("INSTRUCTOR MIDDLEWARE ERROR =", error);

		return res.status(500).json({
			success: false,
			message: "User Role Can't be Verified",
		});
	}
};