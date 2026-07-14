const express = require("express");
const router = express.Router();

const {
  createDemoBooking,
  getAllDemoRequests,
  updateDemoRequestStatus,
  deleteDemoRequest,
} = require("../controllers/DemoBooking");
const { auth, isAdmin } = require("../middlewares/auth");

// Public route - anyone can submit a demo request
router.post("/book", createDemoBooking);

// Admin-only routes
router.get("/requests", auth, isAdmin, getAllDemoRequests);
router.put("/requests/:id", auth, isAdmin, updateDemoRequestStatus);
router.delete("/requests/:id", auth, isAdmin, deleteDemoRequest);

module.exports = router;
