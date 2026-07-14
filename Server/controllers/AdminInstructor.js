const InstructorApplication = require("../models/InstructorApplication");
const User = require("../models/User");

// GET /api/v1/admin/instructor/requests
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await InstructorApplication.find({ status: "Pending" })
      .populate("user", "firstName lastName email image")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error("getAllApplications error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// GET /api/v1/admin/instructor/all
exports.getAllApplicationsAll = async (req, res) => {
  try {
    const applications = await InstructorApplication.find()
      .populate("user", "firstName lastName email image")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error("getAllApplicationsAll error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// PATCH /api/v1/admin/instructor/approve/:id
exports.approveApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await InstructorApplication.findById(id);
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    // Update application status
    application.status = "Approved";
    await application.save();

    // Promote user to Instructor
    await User.findByIdAndUpdate(application.user, { accountType: "Instructor" });

    return res.status(200).json({
      success: true,
      message: "Application approved. User is now an Instructor.",
    });
  } catch (error) {
    console.error("approveApplication error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// PATCH /api/v1/admin/instructor/reject/:id
exports.rejectApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await InstructorApplication.findById(id);
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    application.status = "Rejected";
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application rejected.",
    });
  } catch (error) {
    console.error("rejectApplication error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// GET /api/v1/admin/instructor/count
exports.getPendingCount = async (req, res) => {
  try {
    const count = await InstructorApplication.countDocuments({ status: "Pending" });
    return res.status(200).json({ success: true, count });
  } catch (error) {
    console.error("getPendingCount error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};