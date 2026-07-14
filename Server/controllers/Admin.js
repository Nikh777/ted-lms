const mailSender = require("../utils/mailSender");
const {
  instructorApprovedEmail,
} = require("../mail/InstructorApprovedEmail");

const User = require("../models/User");
const Course = require("../models/Course");
const InstructorApplication = require("../models/InstructorApplication");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Check User
    const admin = await User.findOne({ email }).populate("additionalDetails");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Check Role
    if (admin.accountType !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "You are not an Admin",
      });
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // JWT
    const payload = {
      userId: admin._id,
      email: admin.email,
      accountType: admin.accountType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    admin.password = undefined;
    admin.token = token;

    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      admin,
      message: "Admin Login Successful",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Admin Login Failed",
    });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    // Total Users
    const totalUsers = await User.countDocuments();

    // Students
    const totalStudents = await User.countDocuments({
      accountType: "Student",
    });

    // Instructors
    const totalInstructors = await User.countDocuments({
      accountType: "Instructor",
    });

    // Pending Requests
    const pendingRequests = await InstructorApplication.countDocuments({
      status: "Pending",
    });

    // Published Courses
    const totalCourses = await Course.countDocuments();

const publishedCourses = await Course.countDocuments({
  status: "Published",
});

    // Revenue
    const courses = await Course.find({}, "price studentsEnrolled");

    let totalRevenue = 0;

    courses.forEach((course) => {
      totalRevenue += course.price * (course.studentsEnrolled?.length || 0);
    });

    return res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalStudents,
        totalInstructors,
        pendingRequests,
        pendingInstructorRequests: pendingRequests,
        totalCourses,
        publishedCourses,
        totalRevenue,
        revenue: totalRevenue,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password -token")
      .populate("additionalDetails")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      users,
      data: users,
    });
  } catch (error) {
    console.log("GET USERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

exports.approveInstructor = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await InstructorApplication.findById(id)
      .populate("user", "firstName lastName email");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Instructor application not found",
      });
    }

    if (application.status === "Approved") {
      return res.status(400).json({
        success: false,
        message: "Instructor already approved",
      });
    }
    if (application.status === "Rejected") {
  return res.status(400).json({
    success: false,
    message: "Rejected application cannot be approved",
  });
}
    application.status = "Approved";
    await application.save();

    await User.findByIdAndUpdate(
  application.user._id,
  {
    accountType: "Instructor",
  },
  {
    new: true,
  }
);

    try {
      await mailSender(
        application.user.email,
        "🎉 Congratulations! You are now an Instructor on TED",
        instructorApprovedEmail(application.user.firstName)
      );
    } catch (mailError) {
      console.log(
        "Instructor approval email failed:",
        mailError.message
      );
    }

    return res.status(200).json({
      success: true,
      message: "Instructor approved successfully",
      data: application,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Unable to approve instructor",
      error: error.message,
    });
  }
};
exports.rejectInstructor = async (req, res) => {
  try {
    const { id } = req.params

    const application = await InstructorApplication.findById(id)

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Instructor application not found",
      })
    }
    if (application.status === "Rejected") {
  return res.status(400).json({
    success: false,
    message: "Instructor already rejected",
  });
}
if (application.status === "Approved") {
  return res.status(400).json({
    success: false,
    message: "Approved instructor cannot be rejected",
  });
}

    application.status = "Rejected"
    await application.save()

    return res.status(200).json({
      success: true,
      message: "Instructor application rejected successfully",
      data: application,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to reject instructor",
      error: error.message,
    })
  }
}

exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ accountType: "Instructor" })
      .select("-password -token")
      .populate("additionalDetails")
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      data: instructors,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch instructors",
      error: error.message,
    })
  }
}

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({})
      .populate("instructor", "firstName lastName email")
      .populate("category", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.log("GET COURSES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch courses",
      error: error.message,
    });
  }
};


exports.getPayments = async (req, res) => {
  try {
    const courses = await Course.find({})
      .populate("instructor", "firstName lastName");

    const payments = courses.map((course) => ({
      courseId: course._id,
      courseName: course.courseName,
      instructor:
        course.instructor?.firstName +
        " " +
        course.instructor?.lastName,
      price: course.price,
      students: course.studentsEnrolled?.length || 0,
      revenue: course.price * (course.studentsEnrolled?.length || 0),
    }));

    const totalRevenue = payments.reduce(
      (sum, item) => sum + item.revenue,
      0
    );

    return res.status(200).json({
      success: true,
      totalRevenue,
      data: payments,
    });
  } catch (error) {
    console.log("GET PAYMENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch payment details",
      error: error.message,
    });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalStudents = await User.countDocuments({
      accountType: "Student",
    });

    const totalInstructors = await User.countDocuments({
      accountType: "Instructor",
    });

    const totalCourses = await Course.countDocuments();

    const publishedCourses = await Course.countDocuments({
      status: "Published",
    });

    const pendingRequests = await InstructorApplication.countDocuments({
      status: "Pending",
    });

    const courses = await Course.find();

    let revenue = 0;

    courses.forEach((course) => {
    revenue += course.price * (course.studentsEnrolled?.length || 0);
    });

    return res.status(200).json({
      success: true,
      analytics: {
        totalUsers,
        totalStudents,
        totalInstructors,
        totalCourses,
        publishedCourses,
        pendingRequests,
        revenue,
      },
    });
  } catch (error) {
    console.log("GET ANALYTICS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch analytics",
      error: error.message,
    });
  }
};
exports.getInstructorRequests = async (req, res) => {
  try {
    const pendingRequests = await InstructorApplication.find({ status: "Pending" })
      .populate("user", "firstName lastName email");
      
    return res.status(200).json({
      success: true,
      data: pendingRequests
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch instructor requests"
    });
  }
};