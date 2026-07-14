const DemoBooking = require("../models/DemoBooking");

// ========================================
// CREATE A NEW DEMO BOOKING (Public)
// ========================================
exports.createDemoBooking = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      organization,
      role,
      teamSize,
      preferredDate,
      preferredTime,
      message,
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Phone are required fields.",
      });
    }

    const demoBooking = await DemoBooking.create({
      name,
      email,
      phone,
      organization,
      role,
      teamSize,
      preferredDate,
      preferredTime,
      message,
    });

    return res.status(200).json({
      success: true,
      message: "Demo request submitted successfully.",
      data: demoBooking,
    });
  } catch (error) {
    console.log("CREATE DEMO BOOKING ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while submitting your demo request.",
    });
  }
};

// ========================================
// GET ALL DEMO REQUESTS (Admin only)
// ========================================
exports.getAllDemoRequests = async (req, res) => {
  try {
    const requests = await DemoBooking.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.log("GET DEMO REQUESTS ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Could not fetch demo requests.",
    });
  }
};

// ========================================
// UPDATE DEMO REQUEST STATUS (Admin only)
// ========================================
exports.updateDemoRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = ["Pending", "Completed"];
    const nextStatus = allowedStatus.includes(status) ? status : "Completed";

    const updated = await DemoBooking.findByIdAndUpdate(
      id,
      { status: nextStatus },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Demo request not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Demo request updated successfully.",
      data: updated,
    });
  } catch (error) {
    console.log("UPDATE DEMO REQUEST ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Could not update demo request.",
    });
  }
};

// ========================================
// DELETE DEMO REQUEST (Admin only)
// ========================================
exports.deleteDemoRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await DemoBooking.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Demo request not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Demo request deleted successfully.",
    });
  } catch (error) {
    console.log("DELETE DEMO REQUEST ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Could not delete demo request.",
    });
  }
};
