const express = require("express");
const router = express.Router();

const {
  submitApplication,
  getApplication,
  deleteApplication,
} = require("../controllers/instructorApplication");

const { auth } = require("../middlewares/auth");

// Student applies
router.post("/apply", auth, submitApplication);

// Student checks application
router.get("/my-application", auth, getApplication);

// Delete pending application
router.delete("/delete/:id", auth, deleteApplication);

module.exports = router;