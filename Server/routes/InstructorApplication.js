const express = require("express")
const router = express.Router()

const {
  deleteApplication,
  getApplication,
  submitApplication,
} = require("../controllers/InstructorApplication")
const { auth, isStudent } = require("../middlewares/auth")

router.post("/apply", auth, isStudent, submitApplication)
router.get("/application", auth, isStudent, getApplication)
router.delete("/application/:id", auth, isStudent, deleteApplication)

module.exports = router
