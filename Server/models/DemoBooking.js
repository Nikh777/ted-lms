const mongoose = require("mongoose");

const demoBookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    organization: {
      type: String,
      default: "",
      trim: true,
    },
    role: {
      type: String,
      default: "",
      trim: true,
    },
    teamSize: {
      type: String,
      default: "",
    },
    preferredDate: {
      type: String,
      default: "",
    },
    preferredTime: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DemoBooking", demoBookingSchema);
