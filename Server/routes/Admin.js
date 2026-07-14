const express = require("express")
const router = express.Router()

const {
  approveInstructor,
  getAllInstructors,
  getAnalytics,
  getCourses,
  getDashboard,
  getInstructorRequests,
  getPayments,
  getUsers,
  loginAdmin,
  rejectInstructor,
} = require("../controllers/Admin")
const { auth, isAdmin } = require("../middlewares/auth")

router.post("/login", loginAdmin)
router.get("/dashboard", auth,  isAdmin, getDashboard)
router.get("/users", auth,  isAdmin, getUsers)
router.get("/instructor-requests", auth,  isAdmin, getInstructorRequests)
router.put("/instructor-requests/:id/approve", auth,  isAdmin, approveInstructor)
router.put("/instructor-requests/:id/reject", auth,  isAdmin, rejectInstructor)
router.patch("/instructor/approve/:id", auth, isAdmin, approveInstructor)
router.patch("/instructor/reject/:id", auth, isAdmin, rejectInstructor)
router.get("/instructors", auth,  isAdmin, getAllInstructors)
router.get("/courses", auth,  isAdmin, getCourses)
router.get("/payments", auth,  isAdmin, getPayments)
router.get("/analytics", auth,  isAdmin, getAnalytics)

module.exports = router
