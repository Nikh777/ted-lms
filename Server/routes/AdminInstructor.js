const express = require("express");
const router = express.Router();

const {
  getAllApplications,
  getAllApplicationsAll,
  approveApplication,
  rejectApplication,
  getPendingCount,
} = require("../controllers/adminInstructor");

const { auth, isAdmin } = require("../middlewares/auth");

// All routes require authentication + Admin role
router.use(auth, isAdmin);

// GET all pending applications
router.get("/requests", getAllApplications);

// GET all applications (any status)
router.get("/all", getAllApplicationsAll);

// GET pending count (for dashboard badge)
router.get("/count", getPendingCount);

// Approve an application
router.patch("/approve/:id", approveApplication);

// Reject an application
router.patch("/reject/:id", rejectApplication);

module.exports = router;