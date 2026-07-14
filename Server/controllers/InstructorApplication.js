const InstructorApplication = require("../models/InstructorApplication")
const { uploadImageToCloudinary } = require("../utils/imageUploader")

exports.submitApplication = async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id
    const { linkedin, portfolio, experience, about } = req.body
    const resume = req.files?.resume

    if (!resume || !experience || !about) {
      return res.status(400).json({
        success: false,
        message: "Resume, experience, and about are required",
      })
    }

    const existingPendingApplication = await InstructorApplication.findOne({
      user: userId,
      status: "Pending",
    })

    if (existingPendingApplication) {
      return res.status(409).json({
        success: false,
        message: "You already have a pending instructor application",
      })
    }

    const uploadedResume = await uploadImageToCloudinary(
      resume,
      process.env.FOLDER_NAME
     
    )

    const application = await InstructorApplication.create({
      user: userId,
      resume: uploadedResume.secure_url,
      linkedin,
      portfolio,
      experience,
      about,
      status: "Pending",
    })

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully. Waiting for Admin approval.",
      data: application,
    })
  }  catch(error) {

   console.log("========== INSTRUCTOR APPLICATION ERROR ==========");
   console.log(error);
   console.log(error.message);
   console.log(error.stack);

   return res.status(500).json({
      success:false,
      message:"Unable to submit instructor application",
      error:error.message
   });

}
}

exports.getApplication = async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id
    const application = await InstructorApplication.findOne({ user: userId })
      .sort({ createdAt: -1 })
      .populate("user", "firstName lastName email accountType")

    return res.status(200).json({
      success: true,
      data: application,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch instructor application",
      error: error.message,
    })
  }
}

exports.deleteApplication = async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id
    const { id } = req.params

    const application = await InstructorApplication.findOneAndDelete({
      _id: id,
      user: userId,
      status: "Pending",
    })

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Pending application not found",
      })
    }

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete instructor application",
      error: error.message,
    })
  }
}
