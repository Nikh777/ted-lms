const mongoose = require("mongoose");

const instructorApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one application per user
    },
    resume: {
      type: String, // Cloudinary URL
      required: true,
    },
    linkedin: {
      type: String,
      required: true,
    },
    portfolio: {
      type: String,
      default: "",
    },
    experience: {
      type: Number,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InstructorApplication", instructorApplicationSchema);