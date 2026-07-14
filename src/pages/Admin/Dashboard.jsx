import React, { useEffect, useState } from "react"
import Charts from "../../components/admin/Charts"
import StatsCard from "../../components/admin/StatsCard"
import { apiConnector } from "../../services/apiconnector"
import { adminEndpoints } from "../../services/apis"

const { ADMIN_DASHBOARD_API } = adminEndpoints

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalInstructors: 0,
    pendingInstructorRequests: 0,
    publishedCourses: 0,
    revenue: 0,
  })

  useEffect(() => {
    const getDashboard = async () => {
      try {
        const token = localStorage.getItem("adminToken")

        const response = await apiConnector("GET", ADMIN_DASHBOARD_API, null, {
          Authorization: `Bearer ${token}`,
        })

        if (response.data.success) {
          setStats(response.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getDashboard()
  }, [])

  const dashboardStats = [
    { title: "Total Users", value: stats.totalUsers },
    { title: "Total Students", value: stats.totalStudents },
    { title: "Total Instructors", value: stats.totalInstructors },
    {
      title: "Pending Instructor Requests",
      value: stats.pendingInstructorRequests || stats.pendingRequests || 0,
    },
    {
      title: "Published Courses",
      value: stats.publishedCourses || stats.totalCourses || 0,
    },
    { title: "Revenue", value: `Rs. ${stats.revenue || stats.totalRevenue || 0}` },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-richblack-5">Dashboard</h1>

        <p className="mt-1 text-sm text-richblack-300">
          Overview of platform activity and performance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {dashboardStats.map((stat) => (
          <StatsCard key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>

      <Charts title="Revenue Overview" />
    </div>
  )
}

export default Dashboard
